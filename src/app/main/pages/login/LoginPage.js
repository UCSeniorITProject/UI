import React from 'react';
import {Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {submitLogin} from '../../../auth/store/actions/login.actions';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function LoginPage()
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const {form, handleChange, resetForm} = useForm({
        username   : '',
        password   : '',
        remember   : true
    });

    function isFormValid()
    {
        return (
            form.username.length > 0 &&
            form.password.length > 0
        );
    }

    function handleSubmit(ev)
    {   
        console.log(process.env)
        const {username, password} = form;
        submitLogin(username, password)(dispatch);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        SafeMeds
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
												Keeping the world safer through healthcare analytics.
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                className="mb-16"
                                label="Username"
                                autoFocus
                                type="text"
                                name="username"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextField
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <div className="flex items-center justify-between">

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="remember"
                                                checked={form.remember}
                                                onChange={handleChange}/>
                                        }
                                        label="Remember Me"
                                    />
                                </FormControl>

                                <Link className="font-medium" to="/pages/auth/forgot-password-2">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={!isFormValid()}
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </Button>

                        </form>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/pages/auth/register-2">Create an account</Link>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );
}

export default LoginPage;
