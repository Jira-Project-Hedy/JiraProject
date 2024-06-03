import Button from "@/components/Button";
import { LOGIN_VIEW } from "@/interfaces/enums";
import { useEffect, useState } from "react";
import signUp from "@/services/auth/singUp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IRegisterProps {
  setCurrentView: (view: LOGIN_VIEW) => void;
}

const Register = ({ setCurrentView }: IRegisterProps) => {
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [userLastName, setUserLastName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { status, message } = await signUp(userEmail, userPassword);
    
    if (status === 400 && message) {
      toast.error(message, { toastId: "fail" })
    }
    else {
      toast.success(message, { toastId: "register" })
      router.push("/")
    }
  };

  useEffect(() => {
    if (userFirstName && userLastName && userEmail && userPassword) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [userEmail, userPassword, userFirstName, userLastName])

  return (
    <div id="register-pages" className="w-2/4">
      <div id="onboarding-card" className="min-w-full m-auto bg-gray-bg mt-16 mb-16">
        <div 
          id="onboarding-form" 
          className="p-16 rounded-xl bg-gray-bg flex flex-col justify-center w-full text-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
        >
          <h2 className="text-2xl font-bold	">
            BECOME A MEMBER
          </h2>
          <p className="text-xl">Create your Member profile, and get access to an enhanced shopping experience.</p>
          <form className="mt-8" onSubmit={handleRegister}>
            <div>
              <input
                id="first-name"
                type="text"
                name="first-name"
                placeholder="First Name"
                title="Enter your first name"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                className="border m-2 text-xl bg-white p-4 w-full rounded-lg font-extralight"
                required
              />
            </div>
            <div>
              <input
                id="last-name"
                type="text"
                name="last-name"
                placeholder="Last Name"
                title="Enter your last name"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="border m-2 text-xl bg-white p-4 w-full rounded-lg font-extralight"
                required
              />
            </div>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                title="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="border m-2 text-xl bg-white p-4 w-full rounded-lg font-extralight"
                required
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                title="Enter your password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="border m-2 text-xl bg-white p-4 w-full rounded-lg font-extralight"
                required
              />
            </div>
            <Button name="Sign up" isDisabled={isSubmitDisabled} />
            <Button 
              name="I have account" 
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)} 
              className="bg-gray-bg border-black-btn border border-4 font-medium mb-2 mt-0 hover:font-bold"
            />
          </form>
        </div>
      </div>
    </div>
  );;
}

export default Register;