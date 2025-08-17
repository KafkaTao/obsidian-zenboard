import { CheckCircle, Circle, BarChart, Grid, Plus } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type EmptyStateProps = {
	type: "active" | "completed" | "all" | "stats";
	onActionClick?: () => void;
};

const EmptyState = ({ type, onActionClick }: EmptyStateProps) => {
	const config = {
		active: {
			icon: <Circle className="w-12 h-12 text-blue-400" />,
			title: "今天没有习惯。明天见！",
			description: "添加习惯以开始跟踪您的进度。",
			color: "blue",
		},
		completed: {
			icon: <CheckCircle className="w-12 h-12 text-green-500" />,
			title: "尚未完成任何内容",
			description: "完成任务后会在这里显示",
			color: "green",
		},
		all: {
			icon: <Grid className="w-12 h-12 text-blue-400" />,
			title: "还没有习惯",
			description: "通过添加您的第一个习惯来开始建立您的日常习惯",
			color: "blue",
		},
		stats: {
			icon: <BarChart className="w-12 h-12 text-blue-400" />,
			title: "无可用统计信息",
			description: "添加习惯并取得一些进展后会在这里显示",
			color: "blue",
		},
	};

	const current = config[type];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center justify-center py-16 px-8 text-center"
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
				className="bg-secondary rounded-full p-6 mb-6"
			>
				{current.icon}
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<h3 className="text-default text-xl font-semibold mb-2">
					{current.title}
				</h3>

				<p className="text-muted text-base mb-6 max-w-sm">
					{current.description}
				</p>

				{type === "all" && (
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={onActionClick}
						className={clsx(
							"btn-accent",
							"px-4-1 py-4-2",
							"rounded-m",
							"inline-flex items-center gap-2",
							"font-medium transition-all duration-200",
							"focus:outline-none focus:ring-2 focus:ring-offset-2"
						)}
					>
						<Plus className="w-4 h-4" />
						添加第一个习惯
					</motion.button>
				)}
			</motion.div>
		</motion.div>
	);
};

export default EmptyState;
