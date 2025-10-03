import { Container } from "@/components/container";
import { BackButton } from "@/components/ui/back-button";
import { cn } from "@/lib/utils";

interface ScreenLayoutProps {
	children: React.ReactNode;
	className?: string;
	showBackButton?: boolean;
}

function Title({ children }: { children: React.ReactNode }) {
	return <h2 className="font-bold text-5xl">{children}</h2>;
}

const ScreenLayout = ({ children, className, showBackButton }: ScreenLayoutProps) => {
	return (
		<Container>
			<div className={cn("flex flex-col gap-16 py-36", className)}>
				{showBackButton && <BackButton />}
				{children}
			</div>
		</Container>
	);
};

ScreenLayout.Title = Title;

export { ScreenLayout };
