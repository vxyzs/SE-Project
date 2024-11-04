"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useContext, useRef } from "react"
import ThemeToggler from "./ThemeToggler"
import { AuthContext } from "@/context/AuthContext"
import Logo from "@/components/Header/Logo"
import { Button } from "@nextui-org/react"

const Header = () => {
  // Navbar toggle
  const { user, logout } = useContext(AuthContext)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const navbarRef = useRef(null) // Ref to track navbar

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen)
  }

  // Sticky Navbar
  const [sticky, setSticky] = useState(false)
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar)

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbarOpen(false) 
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  const usePathName = usePathname()

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-md backdrop-blur-sm transition h-20"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-5" : "py-8"
                } `}
              >
                <Logo />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div ref={navbarRef}>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded-lg border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  {user ? (
                    <ul className="block lg:hidden lg:space-x-12">
                      <li>
                        <Link
                          href="/predict"
                          className={`flex py-2 text-base items-center justify-center lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            usePathName === "/predict"
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          Predict 
                        </Link>
                      </li>
                      <li>
                        <Button
                          onClick={handleLogout}
                          className="flex text-base w-full lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                        >
                          Logout
                        </Button>
                      </li>
                    </ul>
                  ) : (
                    <ul className="block lg:space-x-12 lg:hidden">
                      <li>
                        <Link
                          href="/signin"
                          className={`flex py-2 text-base items-center justify-center lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            usePathName === "/signin"
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Button
                          as={Link}
                          href="/signup"
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            usePathName === "/signup"
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          Sign Up
                        </Button>
                      </li>
                    </ul>
                  )}
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {user ? (
                  <>
                    <Link
                      href="/predict"
                      className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Predict
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-md bg-primary px-8 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Button
                      as={Link}
                      href="/signup"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover text-center py-2 hidden rounded-md bg-primary px-8 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
