import { Button } from "../ui/button"

export default function Header() {
    return (
<header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-black rounded-xl shadow mb-8">
            <div className="flex items-center gap-2">
                <h1 className="text-black dark:text-white font-bold text-2xl">
                    Hey, <span className="font-bold">User!</span>
                </h1>
                <span className="text-2xl">👋</span>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    className="bg-white dark:bg-neutral-900 text-gray-700 dark:text-white font-semibold shadow-none hover:bg-purple-100 flex items-center gap-2"
                >
                    <span>Sun, 4 Jun</span>
                    <span className="text-purple-500 text-lg">📅</span>
                </Button>
                <Button
                    variant="outline"
                    className="bg-white dark:bg-neutral-900 text-orange-500 font-semibold shadow-none hover:bg-orange-100 flex items-center gap-2"
                >
                    <span className="text-xl">🔥</span>
                    <span>5</span>
                </Button>
            </div>
        </header>
    )
}