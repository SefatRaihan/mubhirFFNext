import Image from "next/image";

interface FeatureCardProps {
    iconSrc: string;
    text: string;
}

export default function FeatureCard({ iconSrc, text }: FeatureCardProps) {
    return (
        <article className="rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full p-2 bg-white border border-slate-200 shadow-sm">
                    <Image src={iconSrc} width={40} height={40} alt="" />
                </span>
            </div>
            <p className="mt-12 text-[18px] font-medium leading-8">
                {text}
            </p>
        </article>
    );
}
