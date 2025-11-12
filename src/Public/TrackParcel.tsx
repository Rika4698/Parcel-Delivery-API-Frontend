import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api";
import type { ITrackParcel } from "@/types/parcel";
import {
  CheckCircleIcon,
  TruckIcon,
  HomeIcon,
  ClockIcon,
  BanIcon,
  FileCheckIcon,
  XCircleIcon,
  type LucideProps,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/Public/HomePage/LoadingSpinner";

const statusIcons: Record<string, React.ComponentType<LucideProps>> = {
  PENDING: ClockIcon,
  APPROVED: CheckCircleIcon,
  BLOCKED: BanIcon,
  IN_TRANSIT: TruckIcon,
  DELIVERED: HomeIcon,
  CONFIRMED: FileCheckIcon,
  CANCELLED: XCircleIcon,
  DEFAULT: ClockIcon,
};

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    data: TrackedData,
    isLoading,
    isError,
    isFetching,
  } = useGetParcelByTrackingIdQuery(submittedId!, {
    skip: !submittedId || trackingId.trim() === "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTrackingId(value);
    const trimmed = value.trim();
    if (!trimmed) {
      setSubmittedId(null);
    } else {
      setSubmittedId(trimmed);
    }
  };


  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingId.trim();
    if (!trimmed) return;
    setSubmittedId(trimmed);
  };


  const trackingResult: ITrackParcel | null =
    !isError &&
    !isFetching &&
    submittedId &&
    TrackedData?.data
      ? TrackedData.data
      : null;

  // loading state
  const shouldShowLoading = (isLoading || isFetching) && submittedId && trackingId.trim();

  // error state
  const shouldShowError = isError && submittedId && trackingId.trim();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-32 sm:py-40 ">
      <div></div>
      <div className="container mx-auto px-4 ">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-300/20 dark:bg-purple-700/20 blur-2xl rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-blue-200/30 dark:bg-blue-800/30 blur-2xl rounded-full"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="secondary"
            className="w-fit mx-auto animate-bounce border border-blue-600 dark:border-blue-400"
          >
            Parcel Tracking
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-500 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300">
            Track Your Parcel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Enter your tracking ID to follow your package in real time.
          </p>
        </div>

        {/* Input */}
        <form
          onSubmit={handleTrack}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <input
            type="text"
            value={trackingId}
            onChange={handleInputChange}
            placeholder="Enter Tracking ID"
            className="flex-1 px-5 py-3 rounded-lg border border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-400 outline-none transition-all duration-200 text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading || isFetching}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 disabled:opacity-60 transition-all"
          >
            {isLoading || isFetching ? "Tracking..." : "Track Parcel"}
          </button>
        </form>

        {/* Loading */}
        {shouldShowLoading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {/* Error */}
        {shouldShowError && !shouldShowLoading && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg text-center font-medium max-w-xl mx-auto">
            No parcel found with this tracking ID.
          </div>
        )}

        {/* Tracking Result */}
        {trackingResult && !shouldShowLoading && (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-blue-100/60 to-purple-100/60 dark:from-gray-800/60 dark:to-slate-900/60 border border-blue-200 dark:border-gray-700 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Tracking ID
                    </h3>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      {submittedId}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Current Status
                    </h3>
                    <p className="font-bold text-purple-600 dark:text-purple-400">
                      {trackingResult?.currentStatus}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Fee
                    </h3>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      {trackingResult?.fee} TK
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parcel Details */}
            <Card className="bg-white/70 dark:bg-gray-900/60 border border-purple-200 dark:border-gray-700 shadow-md backdrop-blur-md">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                  Parcel Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Address
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.parcelDetails?.address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.parcelDetails?.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Weight
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.parcelDetails?.weight} kg
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Note
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.parcelDetails?.note || "—"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Sender
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.senderId?.name} (
                      {trackingResult?.senderId?.email})
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Receiver
                    </h3>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {trackingResult?.receiverEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status History */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 p-8 rounded-2xl shadow-inner">
              <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600 dark:to-blue-500 dark:from-purple-400">
                Parcel Journey
              </h2>
              <ul className="space-y-8 max-w-3xl mx-auto">
                {trackingResult?.statusHistory.map((item, idx) => {
                  const Icon =
                    statusIcons[item.status] || statusIcons.DEFAULT;
                  return (
                    <li key={idx} className="relative flex items-start gap-6">
                      {idx !==
                        trackingResult?.statusHistory?.length - 1 && (
                        <span className="absolute left-5 top-10 h-full w-px bg-gradient-to-b from-purple-500 to-blue-400" />
                      )}
                      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg">
                        {idx + 1}
                      </span>
                      <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-5 shadow-sm border border-blue-100 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-gray-800 dark:text-gray-100">
                            {item.status}
                          </p>
                          <Icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By: {item.updatedBy?.role || "—"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(item.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {/* Default message */}
        {!submittedId && !isLoading && !isError && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg mt-6 font-medium">
            No tracking parcel details
          </div>
        )}
      </div>
    </div>
  );
}