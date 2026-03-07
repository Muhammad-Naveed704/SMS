import { StatCard } from "@/app/components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Users,
  Activity,
  MessageSquare,
  Video,
  HardDrive,
  DollarSign,
  Mail,
  UserPlus,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import Link from "next/link";

const activityFeed = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "joined a meeting",
    time: "2 minutes ago",
    type: "meeting",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "uploaded a file",
    time: "5 minutes ago",
    type: "file",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "sent a broadcast email",
    time: "12 minutes ago",
    type: "email",
  },
  {
    id: 4,
    user: "James Wilson",
    action: "created a new team",
    time: "18 minutes ago",
    type: "team",
  },
  {
    id: 5,
    user: "Lisa Brown",
    action: "updated user permissions",
    time: "25 minutes ago",
    type: "permission",
  },
];

export default function DashboardOverview({
  stats,
  recentActivities,
}: {
  stats?: {
    totalUsers?: number;
    activeUsers?: number;
    totalMessages?: number;
    totalConversations?: number;
    totalEvents?: number;
  };
  recentActivities?: Array<{ _id: string; action: string; user?: { name: string } }>;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor your company chat platform in real-time
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link href="/dashboard">
              <Video className="mr-2 h-4 w-4" />
              Create Meeting
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/users">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={String(stats?.totalUsers ?? 0)}
          change={`${stats?.activeUsers ?? 0} Active / ${(stats?.totalUsers ?? 0) - (stats?.activeUsers ?? 0)} Inactive`}
          changeType="neutral"
          icon={Users}
        />
        <StatCard
          title="Online Users"
          value={String(stats?.activeUsers ?? 0)}
          change="Live count"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="Messages Today"
          value={String(stats?.totalMessages ?? 0)}
          change="Total messages"
          changeType="positive"
          icon={MessageSquare}
        />
        <StatCard
          title="Conversations"
          value={String(stats?.totalConversations ?? 0)}
          change="Total threads"
          changeType="neutral"
          icon={MessageSquare}
        />
        <StatCard
          title="Storage Usage"
          value="247 GB"
          change="of 500 GB (49.4%)"
          changeType="neutral"
          icon={HardDrive}
        />
        <StatCard
          title="Events"
          value={String(stats?.totalEvents ?? 0)}
          change="Scheduled events"
          changeType="neutral"
          icon={DollarSign}
        />
      </div>

      {/* Middle Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Storage Details</CardTitle>
            <CardDescription>Breakdown by file type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Documents</span>
                <span className="font-medium">89 GB</span>
              </div>
              <Progress value={36} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Images</span>
                <span className="font-medium">72 GB</span>
              </div>
              <Progress value={29} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Videos</span>
                <span className="font-medium">58 GB</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Other</span>
                <span className="font-medium">28 GB</span>
              </div>
              <Progress value={11} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="/users"
              className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium">Manage Users</span>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </Link>
            <Link
              href="/activity"
              className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium">View Activity Logs</span>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Live feed of platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(recentActivities?.length
              ? recentActivities.slice(0, 5).map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start gap-4"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                        {(activity.user?.name || "U")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {activity.user?.name ?? "User"}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          {activity.action}
                        </span>
                      </p>
                    </div>
                    <Badge variant="outline">activity</Badge>
                  </div>
                ))
              : activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">
                          {activity.action}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                )))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
