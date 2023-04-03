import React from "react";
import { Navbar } from "../navbar";
import { Button, Container, SearchBar } from "../ui";
import { Logo } from "../logo";

const Header = () => {
    return (
        <header className="box-blur fixed left-0 top-0 z-10 h-[var(--navigation-height)] w-full bg-[rgba(0,2,18,0.9)]">
            <Container>
                <div className="flex h-full justify-between">
                    <div className="flex items-center">
                        <Logo />
                        <Navbar />
                    </div>
                    <div className="flex items-center">
                        {/* <Button title="Ingresar" className="mr-10" />
                        <Button title="Registrarse" className="mr-10" intent="secondary" />
                        <Button title="Cuenta" className="mr-10" intent="tertiary" /> */}
                        <SearchBar />
                    </div>
                </div>
            </Container>
            <div className="h-[0.1rem] w-full bg-border-gradient" />
        </header>
    );
};

export default Header;
