"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useParentConversations, useParentConversation, useSendMessage } from "@/features/parent/hooks/useParentQueries";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { data: conversations = [], isLoading, isError, refetch } = useParentConversations();
  const { data: activeConv } = useParentConversation(selectedId ?? "");
  const sendMessage = useSendMessage();

  const active = selectedId ? activeConv : conversations[0];
  const activeId = selectedId ?? conversations[0]?.id ?? "";

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const handleSend = async () => {
    if (!message.trim() || !activeId) return;
    await sendMessage.mutateAsync({ conversationId: activeId, content: message.trim() });
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Messages" }]} />
      <PageHeader title="Messages" description="Chat with teachers and school administration" />

      <div className="grid gap-4 overflow-hidden rounded-xl border border-border lg:grid-cols-3" style={{ minHeight: 480 }}>
        {/* Conversation list */}
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-3">
            <p className="text-sm font-medium">Conversations</p>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/50",
                  activeId === conv.id && "bg-muted"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium">{conv.participantName}</p>
                    {conv.unreadCount > 0 && <Badge variant="primary">{conv.unreadCount}</Badge>}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatRelativeTime(conv.lastMessageAt)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col lg:col-span-2">
          {active ? (
            <>
              <div className="border-b border-border p-4">
                <p className="font-medium">{active.participantName}</p>
                <p className="text-xs capitalize text-muted-foreground">{active.participantType}</p>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ maxHeight: 360 }}>
                {active.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.senderType === "parent" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-xl px-4 py-2 text-sm",
                        msg.senderType === "parent"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      <p>{msg.content}</p>
                      <p className={cn("mt-1 text-xs", msg.senderType === "parent" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {formatRelativeTime(msg.sentAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 border-t border-border p-4">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} loading={sendMessage.isPending} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
