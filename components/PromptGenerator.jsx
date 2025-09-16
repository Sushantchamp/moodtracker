import { useState } from 'react';

const prompts = [
    "What are you grateful for today?",
    "What was the most challenging part of your day?",
    "Who made you smile recently and why?",
    "If you could relive one moment from this week, what would it be?",
    "What’s one small win you had today?",
    "What are you looking forward to tomorrow?",
    "How did you take care of yourself today?",
    "Write about a moment you felt proud recently.",
    "What’s one thing you wish had gone differently today?",
    "What did you learn about yourself this week?"
];

export default function PromptGenerator() {
    const [prompt, setPrompt] = useState(
        prompts[Math.floor(Math.random() * prompts.length)]
    );

    const getNewPrompt = () => {
        const random = prompts[Math.floor(Math.random() * prompts.length)];
        setPrompt(random);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-t shadow flex items-start justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-2">Question of the Day
                    <button
                        onClick={getNewPrompt}
                        className="ml-3 text-2xl"
                        title="New Prompt"
                    >
                        <span>{"\uD83D\uDD04"}</span>
                    </button>
                </h2>

                <p className="text-gray-800">💡 {prompt}</p>
            </div>
        </div>
    );
}
