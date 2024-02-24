import React from "react";
import {Route, Routes} from "react-router-dom"
import BookPage from "./components/bookPage";
import Forms from "./components/Form";

const Routers = () => {
    return(
        <>
        <Routes>
            <Route path="/" element = {<BookPage/>}></Route>
            <Route path="/Form" element = {<Forms/>}></Route>
        </Routes>
        </>
    )
}

export default Routers