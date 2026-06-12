interface UserMessageProps {
  content: string;
  createdAt: string;
  userInitial?: string;
}

export function UserMessage({ content, createdAt, userInitial = "R" }: UserMessageProps) {
  return (
    <div className="flex items-start justify-end gap-3 px-4 py-3">
      <div className="max-w-[70%]">
        <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-3">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        <p className="mt-1 text-right text-xs text-muted-foreground">{createdAt}</p>
      </div>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
        {userInitial}
      </div>
    </div>
  );
}
