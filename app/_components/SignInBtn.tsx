import { signIn } from "@/auth";

export function SignInBtn({ provider }: { provider: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-slate-700 text-white"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInBtn;
