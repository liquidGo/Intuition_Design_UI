/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Home from "./pages/home";
import Button from '@/components/button'
import { demoConfig } from "./config/demoConfig";
const demos = demoConfig;

export default [
    {
        path: '/gallery',
        component: Home,
        exact: true,
    }
    , {
        path: '/gallery/:component?/:demo?',
        component: (props) => {
            const { component, demo } = props.match.params;
            console.log('@log: props -----', props);
            const Component = demos[demo] ; 
            console.log('@log: demos -----', demo);
            return <Component />
        },
        exact: true,
    }
]