import Loading from '@/components/Loading';
import PaginationView from '@/components/Pagination';
import { useGetAllContactsQuery } from '@/redux/features/contact/contact.api';
import type { IMessages } from '@/types/user';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp, BsInbox, BsReply } from 'react-icons/bs';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function ContactMessage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllContactsQuery({
    page: currentPage,
    limit: 5,
  },  { refetchOnMountOrArgChange: true });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Loading className='h-screen' />
    );
  }

  const contactMessages: IMessages[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className=" min-h-screen p-4 sm:p-6 lg:p-8 bg-sky-100 dark:bg-neutral-800">
      <div className="max-w-5xl mx-auto  rounded-lg shadow-md border  border-slate-300 dark:border-slate-600 bg-gray-50 dark:bg-gray-800">
        <header className="px-6 py-4 border-b border-slate-300 dark:border-slate-600 ">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Contact Message Inbox
          </h1>
        </header>

        <div className="px-4 py-3 border-b border-slate-300 dark:border-slate-600  text-sm font-semibold text-black dark:text-white">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="hidden md:block md:col-span-3">Sender</div>
            <div className="hidden md:block md:col-span-7">Subject</div>
            <div className="hidden md:block md:col-span-2 text-right pr-10">
              Date
            </div>
            <div className="col-span-12 md:hidden">All Messages</div>
          </div>
        </div>

        <div className="flow-root">
          {contactMessages.length === 0 && !isLoading ? (
            <div className="text-center p-12">
              <BsInbox className="mx-auto text-6xl text-slate-300 dark:text-slate-600 mb-4" />
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Inbox is Empty
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                There are no new messages at this time.
              </p>
            </div>
          ) : isLoading? ( <Loading className='h-screen' />) : (
            <ul className="divide-y divide-slate-300 dark:divide-slate-600">
              {contactMessages?.map(msg => {
                const isExpanded = expandedId === msg._id;
                return (
                  <li
                    key={msg._id}
                    className="p-4 hover: transition-colors duration-200"
                  >
                    <div
                      className="grid grid-cols-12 gap-4 items-center cursor-pointer"
                      onClick={() => handleToggle(msg._id)}
                    >
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-semibold  truncate text-black dark:text-white">
                          {msg.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {msg.email}
                        </p>
                      </div>

                      <div className="col-span-10 md:col-span-7">
                        <p className=" font-medium truncate text-black dark:text-white">
                          {msg.subject}
                        </p>
                      </div>

                      <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
                          {formatDate(msg.createdAt)}
                        </p>
                        {isExpanded ? (
                          <BsChevronUp className="text-slate-500 dark:text-slate-400" />
                        ) : (
                          <BsChevronDown className="text-slate-500 dark:text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className=" whitespace-pre-wrap leading-relaxed text-black dark:text-white">
                         Message: &nbsp; "{msg.message}"
                        </p>
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={e => {
                              e.stopPropagation(); 
                              const email = msg.email;
                              const subject = encodeURIComponent(
                                `Re: ${msg.subject}`
                              );
                              window.open(
                                `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`,
                                '_blank'
                              );
                            }}
                            className="inline-flex items-center gap-2 cursor-pointer text-white dark:text-black bg-gray-800 dark:bg-gray-100 p-2 rounded-sm"
                          >
                            <BsReply className="text-lg" />
                            Reply via Email
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {meta && meta.total > 0 && (
            <div className="mt-6 flex justify-end px-4 mb-4">
              <PaginationView
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                meta={meta}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
