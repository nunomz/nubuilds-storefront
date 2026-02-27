import { getProductsWithFeedback } from "@/lib/feedback";
import { FeedbackGrid } from "@/components/feedback-grid";

export const metadata = {
    title: "Feedback — nubuilds",
    description: "See what our customers think about their nubuilds custom PCs.",
};

export default function FeedbackPage() {
    const items = getProductsWithFeedback();

    return (
        <div className="mx-auto max-w-7xl px-6 py-6">
            <FeedbackGrid items={items} />
        </div>
    );
}
