"use client";
import { login, register } from "@/service/auth.service";
import { SignUp } from "@/types/auth-types";
import { schemaSignup } from "@/validations";
import { useMask } from "@react-input/mask";
import { Card, Input } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (values: SignUp) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    const resStatus: any = await register(payload);
    if (resStatus === 201) {
      const loginStatus = await login({
        phone_number: payload.phone_number,
        password: payload.password,
      });
      if (loginStatus === 201) {
        router.push("/");
      }
    }
    console.log(payload);
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues: SignUp = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  return (
    <div className="container flex justify-center py-8">
      <Card className="p-4 w-[400px]">
        <b className="text-[30px] block text-center">Ro’yhatdan o’tish</b>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaSignup}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-2 mt-4">
              <div>
                <Field
                  name="first_name"
                  type="text"
                  as={Input}
                  placeholder="First name"
                />
                <ErrorMessage
                  name="first_name"
                  component="small"
                  className="text-[red]"
                />
              </div>

              <Field
                name="last_name"
                type="text"
                as={Input}
                placeholder="Last name"
              />
              <ErrorMessage
                name="last_name"
                component="small"
                className="text-[red]"
              />

              <div>
                <Field name="phone_number">
                  {({ field }: any) => (
                    <input
                      {...field}
                      placeholder="+998 (__) ___-__-__"
                      ref={inputRef}
                      className="outline-1 outline-sky-400 w-full p-1 px-2 border rounded-md"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone_number"
                  component="small"
                  className="text-[red]"
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="small"
                  className="text-[red]"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  as={Input.Password}
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="small"
                  className="text-[red]"
                />
              </div>

              <div className="flex justify-between mb-4">
                <small className="dark:text-gray-400 ">
                  Sizda allqachon hisob bormi?
                </small>
                <Link href="/signin" className="text-[13px] text-sky-500">
                  Tizimga kirish
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D55200] rounded-lg text-white py-1"
              >
                {/* {isSubmitting ? <Spin /> : "Submit"} */}
                {isSubmitting ? "Yuborilmoqda" : "Yuborish"}
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUpPage;
