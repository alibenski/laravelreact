import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TemporaryDrawer from "./navigation/TemporaryDrawer";
import ClippedDrawer from "./navigation/ClippedDrawer";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";

const App = () => {
    const theme = createMuiTheme({
        palette: {
            primary: orange,
            secondary: blueGrey
        }
    });
    const history = useHistory();

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    const token = localStorage.userToken;
    console.log("is authenticated? ", isAuthenticated);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            checkSession();
            if (token && token !== "undefined") {
                userHasAuthenticated(true);
            }
        } catch (e) {
            if (e !== "No current user") {
                alert(e);
            }
        }
        setIsAuthenticating(false);
        history.push('/temp');
        history.goBack();
    }

    const checkSession = () => {
        axios
            .get("api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log('check session', response);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleLogout = () => {
        const token = localStorage.userToken;
        axios
            .get("api/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response);
                if (response) {
                    localStorage.removeItem("userToken");
                    console.log(localStorage);
                    userHasAuthenticated(false);
                    // redirect if successful
                    history.push("/");
                }
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    return (
        !isAuthenticating && (
            <ThemeProvider theme={theme}>
                {isAuthenticated ? (
                    // <TemporaryDrawer handleLogout={handleLogout} />
                    <ClippedDrawer handleLogout={handleLogout} />
                ) : (
                    <></>
                )}
                <AppContext.Provider
                    value={{ isAuthenticated, userHasAuthenticated }}
                >
                    <div style={{ marginTop: "5rem" }}>
                        <Routes />
                    </div>
                </AppContext.Provider>
            </ThemeProvider>
        )
    );
};

export default App;
