'use client'

import {useParams} from "next/navigation";
import CoursePage from "@/features/courses/components/CoursePage";

const QuestionsPage = () => {
    const params = useParams();
    const { level } = params;

    if (!level) return null;

    return <CoursePage level={level as string} />;
};

export default QuestionsPage;