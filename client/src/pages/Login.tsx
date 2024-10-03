import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken } from "../store/authSlice";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

// Define the login schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Infer the types from the schema for form data validation
type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await axios.post(`${import.meta.env.PROXY_API}/auth/login`, { ...values });
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful login, e.g., store the token in local storage
      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token)); // Save token in Redux store
      navigate("/invoices");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-md"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                {/* {form.errors.email && (
                  <p className="text-red-500 text-sm">{form.errors.email}</p>
                )} */}
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-500 text-white py-2">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
