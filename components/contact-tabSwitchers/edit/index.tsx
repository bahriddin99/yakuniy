"use client";
import { SignUp } from "@/types/auth-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { schemaSignup } from "@/validations";
import Link from "next/link";
import { useMask } from "@react-input/mask";
import { Input } from "antd";
import useAccountStore from "@/store/acount";
interface UserDataEditProps {
  user_data: any;
}

const UserDataEdit = ({ user_data }: UserDataEditProps) => {
  const pn = user_data.phone_number;
   const { updateUser } = useAccountStore();
  const initialValues: SignUp = {
    first_name: user_data.first_name,
    last_name: user_data.last_name,
    phone_number: `${pn.slice(0, 4)} (${pn.slice(4, 6)}) ${pn.slice(
      6,
      9
    )}-${pn.slice(9, 11)}-${pn.slice(11, 13)}`,
    email: user_data.email,
    password: "",
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (values: SignUp) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    const resStatus: any = await updateUser(payload, user_data.id);
    // if (resStatus === 201) {
    // }
    console.log(payload);
  };

  return (
    <div className="p-10 px-16 bg-white rounded-lg">
      <h2 className="text-lg font-bold mb-4">Malumotlarni tahrirlash</h2>
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
              <Field name="email" type="email" as={Input} placeholder="Email" />
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
    </div>
  );
};

export default UserDataEdit;
