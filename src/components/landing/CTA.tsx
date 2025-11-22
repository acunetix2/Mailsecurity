import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const CTA = () => {
  return (
    <section className="bg-[#081325] py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl text-orange-400">
            Ready to Protect Your Inbox?
          </h2>
          <p className="mb-10 text-lg sm:text-xl text-orange-200">
            Join thousands of users who have eliminated email threats with MailInsight AI. Start your free scan today.
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg rounded-full transition-all flex items-center justify-center mx-auto"
            onClick={() => (window.location.href = "/auth")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Get Started Free
          </Button>
          <p className="mt-6 text-sm text-orange-300">
            No credit card required • Free plan available • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
