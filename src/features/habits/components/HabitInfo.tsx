import React, { useState } from "react";
import { StoredHabit } from "@habits/types";
import { CheckCircle, Trash2, Calendar, Target, Timer, X } from "lucide-react";
import HabitIcon from "./Form/iconsmap";
import { HabitStore } from "@habits/store";

interface HabitInfoCardProps {
	task: StoredHabit;
}

export function HabitInfoCard({ task }: HabitInfoCardProps) {
	const { deleteHabit } = HabitStore();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const getHabitStats = () => {
		const stats = [];

		if (task.trackingType === "amount") {
			stats.push({
				icon: <Target className="w-3.5 h-3.5" />,
				value: `${task.targetCount || 0} ${task.counterValue || "次"}`,
			});
		}

		if (task.trackingType === "time") {
			stats.push({
				icon: <Timer className="w-3.5 h-3.5" />,
				value: formatTime(task.timeValue || 0),
			});
		}

		const getRepeatLabel = (task: StoredHabit): string => {
			if (task.selectedDays.length > 0) {
				return `每周${task.selectedDays.length}次`;
			}

			const interval = task.repeatInterval ?? 1;

			if (task.repeatability === "every_few_days") {
				return `每${interval}天`;
			}

			return `每${interval}个月`;
		};
		stats.push({
			icon: <Calendar className="w-3.5 h-3.5" />,
			value: getRepeatLabel(task),
		});

		return stats;
	};

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleDeleteClick = () => setShowDeleteModal(true);
	const handleConfirmDelete = () => {
		deleteHabit(task.id);
		setShowDeleteModal(false);
	};
	const handleCancelDelete = () => setShowDeleteModal(false);

	return (
		<div className="group relative bg-primary/80 backdrop-blur-md rounded-2xl border-default shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] p-3 max-w-xs overflow-hidden">
			{/* Icon + Title Row */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2">
					<div
						className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md relative"
						style={{
							backgroundColor: task.color,
							boxShadow: `0 4px 16px ${task.color}40`,
						}}
					>
						<HabitIcon
							name={task.icon || "Smile"}
							className="text-white text-lg"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-semibold text-default leading-tight truncate max-w-[120px]">
							{task.name}
						</span>
						<span className="text-[10px] text-muted font-medium">
							{task.trackingType} 习惯
						</span>
					</div>
				</div>
				<button
					onClick={handleDeleteClick}
					className="p-1 text-muted hover:text-red-500 transition"
					title="删除习惯"
				>
					<Trash2 className="w-4 h-4" />
				</button>
			</div>

			{/* Active Days */}
			<div className="flex flex-wrap gap-1 mb-2">
				{task.selectedDays.map((day, index) => (
					<span
						key={index}
						className="text-[10px] px-2 py-1 rounded-m bg-primary/60 text-muted border-default"
					>
						{day.slice(0, 2)}
					</span>
				))}
			</div>

			{/* Stats */}
			<div className="grid grid-cols-2 gap-2 text-xs mb-3">
				{getHabitStats()
					.slice(0, 2)
					.map((stat, index) => (
						<div
							key={index}
							className="flex items-center gap-2 bg-secondary/70 p-2 rounded-m border-default"
						>
							<div className="w-6 h-6 flex items-center justify-center bg-primary rounded-m text-muted">
								{stat.icon}
							</div>
							<div>
								<div className="text-sm font-bold text-default">
									{stat.value}
								</div>
								{/* <div className="text-[10px] text-muted"> */}
								{/*   {label} */}
								{/* </div> */}
							</div>
						</div>
					))}
			</div>

			{/* Dates */}
			<div className="flex items-center justify-between text-[10px] text-muted border-t border-hover pt-2">
				<div className="flex items-center gap-1">
					<Calendar className="w-3.5 h-3.5" />
					{task.startDate || "未设置"}
				</div>
				<div className="flex items-center gap-1">
					<CheckCircle className="w-3.5 h-3.5" />
					{task.endDate || "进行中"}
				</div>
			</div>

			{/* Delete Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-primary rounded-2xl shadow-lg w-full max-w-xs transition-all border-default overflow-hidden">
						<div className="flex items-center justify-between p-4 border-b border-hover">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-m bg-red-500 flex items-center justify-center shadow-md">
									<Trash2 className="w-4 h-4 text-white" />
								</div>
								<h3 className="text-sm font-bold text-default">
									删除习惯
								</h3>
							</div>
							<button
								onClick={handleCancelDelete}
								className="p-1 text-muted hover:text-default transition"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
						<div className="p-4 text-sm text-muted">
							您确定要删除{" "}
							<span className="font-semibold text-default">
								{task.name}
							</span>
							吗？此操作无法撤销。
						</div>
						<div className="p-4 pt-2 flex gap-2">
							<button
								onClick={handleCancelDelete}
								className="flex-1 px-3 py-2 text-xs font-bold text-muted bg-secondary hover:bg-hover rounded-xl transition"
							>
								取消
							</button>
							<button
								onClick={handleConfirmDelete}
								className="flex-1 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition"
							>
								删除
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
