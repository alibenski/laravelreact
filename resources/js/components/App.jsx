import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TopBar from "./navigation/TopBar";
import TemporaryDrawer from "./navigation/TemporaryDrawer";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import ProtectedRoute from "./authentication/ProtectedRoute";
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

    useEffect(() => {
        onLoad();
    }, []);

    const checkSession = () => {
        axios
            .get("api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    async function onLoad() {
        try {
            await checkSession();
            if (token) {
                userHasAuthenticated(true);
            }
        } catch (e) {
            if (e !== "No current user") {
                alert(e);
            }
        }
        setIsAuthenticating(false);
    }
    console.log("isAuthenticating", isAuthenticating);
    console.log("token", token);

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
                    <TemporaryDrawer handleLogout={handleLogout} />
                ) : (
                    <></>
                )}
                <AppContext.Provider
                    value={{ isAuthenticated, userHasAuthenticated }}
                >
                    <Routes />
                </AppContext.Provider>
            </ThemeProvider>
        )
    );
};

export default App;
