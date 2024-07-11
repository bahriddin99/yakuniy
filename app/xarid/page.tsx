"use client";
import React, { useState } from "react";
import { Input, Radio, RadioChangeEvent, Select, Space } from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useMask } from "@react-input/mask";
import { schemaSignup } from "@/validations";
import { data } from "./viloyatlar-data";
import ProductsCarucel from "@/components/ui/carusel/pr-carucel";

const { Option } = Select;

interface SignUpFormValues {
  full_name: string;
  phone_number: string;
  region: string;
  districts: string[];
}

const XaridniRasmiylashtirishPage: React.FC = () => {
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const [value, setValue] = useState<number>(1);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    const selectedRegionData: any = data.find((region: any) => region[value]);
    setDistricts(selectedRegionData ? selectedRegionData[value] : []);
  };

  const initialValues: SignUpFormValues = {
    full_name: "",
    phone_number: "",
    region: "",
    districts: [],
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    console.log(payload);
  };

  return (
    <div className="my-5">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[70%]">
          <div className="bg-white rounded-lg p-4 lg:p-[44px]">
            <Formik
              initialValues={initialValues}
              validationSchema={schemaSignup}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="grid gap-4 mt-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full">
                      <small className="text-gray-500 text-[10px]">
                        Telefon raqam
                      </small>
                      <Field name="phone_number">
                        {({ field }: { field: any }) => (
                          <input
                            {...field}
                            placeholder="+998 (__) ___-__-__"
                            ref={inputRef}
                            className="outline-1 outline-blue-600 w-full p-1 px-2 border rounded-md"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="phone_number"
                        component="small"
                        className="text-[red]"
                      />
                    </div>
                    <div className="w-full">
                      <small className="text-gray-500 text-[10px]">
                        Ism/Familiya
                      </small>
                      <Field name="full_name" type="text" as={Input} />
                      <ErrorMessage
                        name="full_name"
                        component="small"
                        className="text-[red]"
                      />
                    </div>
                  </div>

                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio className="text-[14px]" value={1}>
                        Do’kondan olib ketish
                      </Radio>
                      <Radio className="text-[14px]" value={2}>
                        Xaridingizni uyingizga yetkazib berish
                      </Radio>
                    </Space>
                  </Radio.Group>

                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full">
                      <small className="text-gray-500 text-[10px]">
                        Viloyat
                      </small>
                      <Select
                        className="w-full"
                        onChange={(value) => {
                          handleRegionChange(value);
                          setFieldValue("region", value);
                          setFieldValue("districts", []);
                        }}
                        placeholder="Viloyatni tanlang"
                      >
                        {data.map((region) => (
                          <Option
                            key={Object.keys(region)[0]}
                            value={Object.keys(region)[0]}
                          >
                            {Object.keys(region)[0]}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className="w-full">
                      <small className="text-gray-500 text-[10px]">Tuman</small>
                      <Field name="districts">
                        {({ field }: { field: any }) => (
                          <Select
                            {...field}
                            mode="multiple"
                            className="w-full"
                            placeholder="Tumanlarni tanlang"
                            onChange={(value) =>
                              setFieldValue("districts", value)
                            }
                          >
                            {districts.map((district) => (
                              <Option key={district} value={district}>
                                {district}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-[70%]">
                      <small className="text-gray-500 text-[10px]">
                        Aniq manzilni kiriting: Mahalla/Ko’cha/Uy
                      </small>
                      <Field
                        name="manzil"
                        type="text"
                        as={Input}
                        placeholder="Tinchlik mahallasi Yoshlik-1 ko’chasi 12-uy"
                      />
                      <ErrorMessage
                        name="manzil"
                        component="small"
                        className="text-[red]"
                      />
                    </div>
                    <div className="w-full lg:w-[30%]">
                      <small className="text-gray-500 text-[10px]">
                        Yetkazib berish sanasi
                      </small>
                      <Field
                        name="delivery_date"
                        type="text"
                        as={Input}
                        placeholder="08/24"
                      />
                      <ErrorMessage
                        name="delivery_date"
                        component="small"
                        className="text-[red]"
                      />
                    </div>
                  </div>

                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio className="text-[14px]" value={1}>
                        Naqtd yetkazgandan so’ng to’lash
                      </Radio>
                      <Radio className="text-[14px]" value={2}>
                        Karta orqali (Humo/Uzcard/Visa)
                      </Radio>
                      <Radio className="text-[14px]" value={3}>
                        Muddatli to’lov (4/6/12/24 oyga)
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="w-full lg:w-[30%] mb-8">
          <div className="bg-white rounded-lg p-4 lg:p-8 flex flex-col gap-3">
            <b className="block text-center text-[18px]">
              Sizning haridlaringiz
            </b>
            <div className="flex items-center gap-3">
              <small>Mahsulotlar:</small> <b>6 ta</b>
            </div>
            <div className="flex items-center gap-3">
              <small>Jami summa:</small> <b>56 778 678 so‘m</b>
            </div>
            <button className="w-full h-[46px] bg-[#f0f0f0] rounded-lg text-gray-400 font-bold text-[14px] flex justify-center items-center gap-3">
              Xaridni rasmiylashtirish
            </button>
          </div>
        </div>
      </div>
      <ProductsCarucel title="Aksiyadagi mahsulotlar" />
    </div>
  );
};

export default XaridniRasmiylashtirishPage;
