import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertOctagon,
  AlertTriangle,
  ArchiveIcon,
  CheckCircle,
} from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        default: "bg-red-100 border-red-100 text-primary",
        DRAFT: "bg-yellow-200/80 border-yellow-30 text-primary",
        PUBLISHED: "bg-emerald-600 border-emerald-800 text-secondary",
        ARCHIVED: "bg-slate-200 text-slate-700",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  },
);

const iconMap = {
  default: AlertOctagon,
  DRAFT: AlertTriangle,
  PUBLISHED: CheckCircle,
  ARCHIVED: ArchiveIcon,
};
const labelMap = {
  default:
    "The course status is not known, please update the course using the actions below",
  DRAFT: "This course is still a draft. Publish it to make it available",
  PUBLISHED: "The course is now published",
  ARCHIVED:
    "The course has been archived. It is no longer available to the users.",
};
export const CourseStatusBanner = ({
  variant,
}: VariantProps<typeof bannerVariants>) => {
  const Icon = iconMap[variant || "default"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2 h-4 w-4" />
      {labelMap[variant || "default"]}
    </div>
  );
};
