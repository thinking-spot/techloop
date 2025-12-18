"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/quiz-data";
import QuizResults from "./QuizResults";
import { Button } from "../ui/Button";
import { ArrowRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function QuizRunner() {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [completed, setCompleted] = useState(false);

    const question = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (value: any) => {
        setAnswers(prev => ({ ...prev, [question.id]: value }));

        // Auto-advance for single choice
        if (question.type === "single" || question.type === "slider") {
            setTimeout(() => nextQuestion(), 250);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const retake = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setCompleted(false);
        setStarted(false);
    };

    if (completed) {
        return <QuizResults answers={answers} onRetake={retake} />;
    }

    if (!started) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-6xl mb-6">🔮</div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-headline mb-6">
                        Find Your Perfect AI Device
                    </h1>
                    <p className="text-xl text-paragraph mb-10 leading-relaxed">
                        Answer a few questions about your life and goals. We&apos;ll match you with devices that actually fit how you want to live.
                    </p>
                    <Button size="lg" onClick={() => setStarted(true)} className="px-10 py-4 text-lg shadow-xl shadow-button/20">
                        Start Quiz <ArrowRight size={20} className="ml-2" />
                    </Button>
                    <p className="mt-4 text-sm text-paragraph/60">Takes less than 2 minutes</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 min-h-[600px] flex flex-col">

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="bg-button h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Back Button */}
            <div className="mb-4">
                <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="text-paragraph/50 hover:text-headline flex items-center gap-1 text-sm font-medium disabled:opacity-0 transition-opacity"
                >
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-headline mb-2">
                        {question.text}
                    </h2>
                    {question.subtext && (
                        <p className="text-paragraph mb-6">{question.subtext}</p>
                    )}

                    <div className="grid gap-3 mt-8">
                        {question.type === "single" && (
                            <div className="grid gap-3">
                                {question.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswer(option.id)}
                                        className={clsx(
                                            "flex items-center gap-4 p-4 text-left rounded-xl border-2 transition-all hover:shadow-md",
                                            answers[question.id] === option.id
                                                ? "border-button bg-button/5 ring-1 ring-button"
                                                : "border-[#F1F5F9] bg-white hover:border-button/50"
                                        )}
                                    >
                                        <span className="text-2xl">{option.icon}</span>
                                        <span className="font-medium text-headline text-lg">{option.label}</span>
                                        {answers[question.id] === option.id && (
                                            <Check size={20} className="ml-auto text-button" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {question.type === "multiple" && (
                            <div className="grid gap-3">
                                {question.options.map((option) => {
                                    const currentAnswers = (answers[question.id] as string[]) || [];
                                    const isSelected = currentAnswers.includes(option.id);

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                const newAnswers = isSelected
                                                    ? currentAnswers.filter(id => id !== option.id)
                                                    : [...currentAnswers, option.id];
                                                setAnswers(prev => ({ ...prev, [question.id]: newAnswers }));
                                            }}
                                            className={clsx(
                                                "flex items-center gap-4 p-4 text-left rounded-xl border-2 transition-all hover:shadow-md",
                                                isSelected
                                                    ? "border-button bg-button/5 ring-1 ring-button"
                                                    : "border-[#F1F5F9] bg-white hover:border-button/50"
                                            )}
                                        >
                                            <span className="text-2xl">{option.icon}</span>
                                            <span className="font-medium text-headline text-lg">{option.label}</span>
                                            {isSelected && (
                                                <Check size={20} className="ml-auto text-button" />
                                            )}
                                        </button>
                                    );
                                })}
                                <div className="mt-8 flex justify-end">
                                    <Button onClick={nextQuestion} size="lg">Next <ArrowRight size={18} className="ml-2" /></Button>
                                </div>
                            </div>
                        )}

                        {question.type === "grid-card" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {question.options.map((option) => {
                                    const currentAnswers = (answers[question.id] as string[]) || [];
                                    const isSelected = currentAnswers.includes(option.id);

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                const newAnswers = isSelected
                                                    ? currentAnswers.filter(id => id !== option.id)
                                                    : [...currentAnswers, option.id];
                                                setAnswers(prev => ({ ...prev, [question.id]: newAnswers }));
                                            }}
                                            className={clsx(
                                                "relative flex flex-col items-start p-0 text-left rounded-xl border-2 transition-all hover:shadow-lg overflow-hidden h-full group",
                                                isSelected
                                                    ? "border-button ring-1 ring-button"
                                                    : "border-[#F1F5F9] bg-white hover:border-button/50"
                                            )}
                                        >
                                            <div className="relative w-full h-32 bg-gray-100">
                                                {option.image && <img src={option.image} alt={option.label} className="w-full h-full object-cover" />}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 bg-button text-white rounded-full p-1 shadow-sm">
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <span className="font-bold text-headline mb-2">{option.label}</span>
                                                <span className="text-xs text-paragraph leading-relaxed">{option.description}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                                <div className="col-span-full mt-8 flex justify-end">
                                    <Button onClick={nextQuestion} size="lg">Next <ArrowRight size={18} className="ml-2" /></Button>
                                    <p className="mt-2 text-xs text-paragraph text-right w-full block sm:hidden">Scroll down to continue</p>
                                </div>
                            </div>
                        )}

                        {question.type === "slider" && (
                            <div className="py-8">
                                <div className="grid grid-cols-1 gap-3">
                                    {question.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswer(option.value)}
                                            className={clsx(
                                                "flex items-center justify-between p-5 rounded-xl border-2 transition-all",
                                                answers[question.id] === option.value
                                                    ? "border-button bg-button/5"
                                                    : "border-[#F1F5F9] bg-white hover:border-button/50"
                                            )}
                                        >
                                            <span className="font-medium text-headline">{option.label}</span>
                                            <span className="text-2xl">{option.icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    );
}
