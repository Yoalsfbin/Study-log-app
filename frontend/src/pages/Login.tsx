import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";

const schema = z.object({
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});

type FormData = z.infer<typeof schema>;

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { refreshUser } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      await refreshUser();
      toast.success("ログインに成功しました！");
      navigate("/index");
    } catch (error) {
      toast.error("ログインに失敗しました");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">ログイン</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            メールアドレス
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            パスワード
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "ログイン中…" : "ログイン"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
