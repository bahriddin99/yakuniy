"use client";
import { login } from "@/service/auth.service";
import { SignIn } from "@/types/auth-types";
import { schemaSignin } from "@/validations";
import { useMask } from "@react-input/mask";
import { Card, Input } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (values: SignIn) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    const resStatus: any = await login(payload);
    if (resStatus === 201) {
      router.push("/");
    }
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues: SignIn = {
    phone_number: "",
    password: "",
  };

  return (
    <div className="container flex justify-center py-8">
      <Card className="p-4 w-[400px]">
        <b className="text-[30px] block text-center">Kirish</b>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaSignin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-2 mt-4">
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
                  className="text-red-500"
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
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-between mb-4">
                <small className="dark:text-gray-400">
                  Sizda hisob yo'qmi?
                </small>
                <Link href="/signup" className="text-[13px] text-sky-500">
                  Ro'yxatdan o'tish
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D55200] rounded-lg text-white py-1"
              >
                {isSubmitting ? "Yuborilmoqda" : "Yuborish"}
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignInPage;
