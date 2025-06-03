import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormQueueProps = {
  onSubmit: (url: string, apiKey: string) => void;
};

const validationSchema = Yup.object({
  url: Yup.string().url("URL inválida").required("Campo obrigatório"),
  apiKey: Yup.string().required("Campo obrigatório"),
});

const FormQueue: React.FC<FormQueueProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ url: "", apiKey: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values.url, values.apiKey)}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium">
              URL da API
            </label>
            <Field
              id="url"
              name="url"
              type="text"
              as={Input}
              placeholder="Digite a URL da API"
              className="w-full p-2 border rounded"
            />
            {errors.url && touched.url && (
              <div className="text-red-500 text-sm">{errors.url}</div>
            )}
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium">
              API Key
            </label>
            <Field
              id="apiKey"
              name="apiKey"
              type="text"
              as={Input}
              placeholder="Digite sua API Key"
              className="w-full p-2 border rounded"
            />
            {errors.apiKey && touched.apiKey && (
              <div className="text-red-500 text-sm">{errors.apiKey}</div>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            Consultar Filas
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormQueue;
