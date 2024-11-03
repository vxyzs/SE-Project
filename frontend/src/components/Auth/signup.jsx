'use client'
import Link from "next/link"
import { useState, useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import toast from "react-hot-toast"

const SignupPage = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const { signup ,loading } = useContext(AuthContext) // Access signup from AuthContext
  const router = useRouter()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Call signup function from AuthContext with form data
      await signup(data)
      console.log(data)
      console.log("User signed up successfully");
      toast.success("User signed up successfully")
      router.push("/")
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed")
    }
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="text-body-color dark:text-body-color-dark mb-3 block text-sm font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={data.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="border-stroke focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded-lg border bg-transparent py-3 px-6 text-base font-medium outline-none transition disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="text-body-color dark:text-body-color-dark mb-3 block text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      required
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="border-stroke focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded-lg border bg-transparent py-3 px-6 text-base font-medium outline-none transition disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="text-body-color dark:text-body-color-dark mb-3 block text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={data.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="border-stroke focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded-lg border bg-transparent py-3 px-6 text-base font-medium outline-none transition disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>

                  <div className="mb-6">
                  <Button
                    onClick={handleSubmit}
                    isDisabled={loading}
                    className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-md px-9 py-6 text-base font-medium text-white duration-300 ${loading ? 'bg-blue-500 text-gray-100' : 'bg-primary'} hover:bg-opacity-90`}
                    color="primary"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                  </div>
                </form>

                <p className="text-body-color dark:text-body-color-dark text-center text-base font-medium">
                  Already using Startup?{" "}
                  <Link
                    href="/signin"
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignupPage
