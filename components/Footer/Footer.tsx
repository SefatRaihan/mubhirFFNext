import InstaIcon from "@/public/icons/InstaIcon";
import LocationIcon from "@/public/icons/LocationIcon";
import MailIcon from "@/public/icons/MailIcon";
import PhoneIcon from "@/public/icons/PhoneIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import XIcon from "@/public/icons/XIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EAECF0] m-0 md:m-4 rounded-none md:rounded-2xl">
      <div className="px-6 md:px-[168px] pt-10 md:pt-[84px] flex flex-col md:flex-row-reverse justify-between space-y-8 md:space-y-0">
        {/* Right: Contact + Social (now first in RTL) */}
        <div className="space-y-4 order-3 md:order-0">
          <h3 className="text-base md:text-[16px] font-semibold text-[#671E5A] mb-4">
            تواصلوا معنا
          </h3>
          <section dir="rtl" className="max-w-xl">
            <ul className="space-y-2 text-[#344054] text-sm md:text-[16px] font-medium mb-4 pr-2">
              {/* Phone */}
              <li className="flex items-center space-x-reverse">
                <Link
                  href="tel:+966568876934"
                  className="flex items-center space-x-2"
                >
                  <PhoneIcon />
                  <span dir="ltr">+966 568876934</span>
                </Link>
              </li>

              {/* Email */}
              <li className="flex items-center space-x-reverse">
                <Link
                  href="mailto:info@mubhir.ai"
                  className="flex items-center space-x-2"
                >
                  <MailIcon />
                  <span>info@mubhir.ai</span>
                </Link>
              </li>

              {/* Location */}
              <li className="flex items-center space-x-reverse">
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=الرياض، المملكة العربية السعودية"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center space-x-2"
                >
                  <LocationIcon />
                  <span>الرياض، المملكة العربية السعودية.</span>
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            {/* <div
              className="flex space-x-4 space-x-reverse"
              style={{ marginBottom: "60px" }}
            >
              <Link href="https://wa.me/966568876934">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip_whatsapp_footer)">
                      <path
                        d="M2.63623 17.3666L3.98648 14.2569C2.95347 12.7905 2.49111 10.9975 2.68619 9.21443C2.88126 7.43134 3.72035 5.78073 5.04598 4.57236C6.37162 3.364 8.09267 2.68094 9.88616 2.65139C11.6796 2.62184 13.4223 3.24782 14.787 4.41185C16.1517 5.57588 17.0447 7.19795 17.2985 8.97365C17.5522 10.7493 17.1491 12.5566 16.165 14.0562C15.1809 15.5559 13.6833 16.6448 11.9533 17.1187C10.2233 17.5926 8.37981 17.4189 6.76881 16.6301L2.63623 17.3666Z"
                        stroke="#671E5A"
                        strokeWidth="1.63667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.54639 8.3652C7.54639 8.47371 7.58949 8.57779 7.66623 8.65452C7.74296 8.73125 7.84704 8.77436 7.95555 8.77436C8.06407 8.77436 8.16814 8.73125 8.24488 8.65452C8.32161 8.57779 8.36472 8.47371 8.36472 8.3652V7.54686C8.36472 7.43834 8.32161 7.33427 8.24488 7.25754C8.16814 7.1808 8.06407 7.1377 7.95555 7.1377C7.84704 7.1377 7.74296 7.1808 7.66623 7.25754C7.58949 7.33427 7.54639 7.43834 7.54639 7.54686V8.3652ZM7.54639 8.3652C7.54639 9.45037 7.97747 10.4911 8.74481 11.2584C9.51214 12.0258 10.5529 12.4569 11.6381 12.4569M11.6381 12.4569H12.4564C12.5649 12.4569 12.669 12.4138 12.7457 12.337C12.8224 12.2603 12.8656 12.1562 12.8656 12.0477C12.8656 11.9392 12.8224 11.8351 12.7457 11.7584C12.669 11.6816 12.5649 11.6385 12.4564 11.6385H11.6381C11.5295 11.6385 11.4255 11.6816 11.3487 11.7584C11.272 11.8351 11.2289 11.9392 11.2289 12.0477C11.2289 12.1562 11.272 12.2603 11.3487 12.337C11.4255 12.4138 11.5295 12.4569 11.6381 12.4569Z"
                        stroke="#671E5A"
                        strokeWidth="1.63667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip_whatsapp_footer">
                        <rect
                          width="19.64"
                          height="19.64"
                          fill="white"
                          transform="translate(0.181641 0.181641)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>

              <Link href="https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==">
                <div className="rounded-full p-2 md:p-[8.18px] bg-[#671e5a]">
                  <WhatsappIcon />
                </div>
              </Link>

              <Link href="https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <TiktokIcon />
                </div>
              </Link>

              <Link href="https://t.me/mubhirai">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <TelegramIcon />
                </div>
              </Link>

              <Link href="https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <XIcon />
                </div>
              </Link>

              <Link href="https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <SnapIcon />
                </div>
              </Link>
            </div> */}

            <div
              className="flex space-x-4"
              style={{ marginBottom: "60px" }}
            >
              <Link href="https://wa.me/966568876934">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <WhatsappIcon />
                </div>
              </Link>
              <Link href="https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==">
                <div className="rounded-full p-2 md:p-[8.18px] bg-[#C445A6]">
                  <InstaIcon />
                </div>
              </Link>
              <Link href="https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <TiktokIcon />
                </div>
              </Link>
              <Link href="https://t.me/mubhirai">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <TelegramIcon />
                </div>
              </Link>

              <Link href="https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <XIcon />
                </div>
              </Link>

              <Link href="https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <SnapIcon />
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Middle: Quick Links (now second in RTL) */}
        <div className="flex flex-col md:flex-row justify-evenly space-y-8 md:space-y-0 md:space-x-reverse md:space-x-[70px] order-2 md:order-0">
          <div>
            <h3 className="text-base md:text-[16px] font-semibold text-[#671E5A] mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-[#344054] text-sm md:text-[16px] font-medium">
              <li>
                <Link href="/" className="hover:underline">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/ar-aboutUs" className="hover:underline">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/ar-contactUs" className="hover:underline">
                  تواصلوا معنا
                </Link>
              </li>
              <li>
                <Link href="/ar-blog" className="hover:underline">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Left: Logo + Description (now last in RTL, first on mobile) */}
        <div className="space-y-6 order-1 md:order-0">
          <div className="flex items-center space-x-reverse space-x-2">
            <img src="/image/Logo1.png" alt="شعار مبھر" className="h-8 w-8" />
            <span className="text-xl md:text-[24px] font-normal text-[#3c005a]">
              مبھر
            </span>
          </div>
          <p className="text-[#344054] font-medium text-sm md:text-[16px]">
            منصة تقدم اختبارات تجريبية وموارد <br /> لاختبار القدرات العامة.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-8 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse justify-center text-xs text-gray-600 space-y-4 md:space-y-0">
          <span>جميع الحقوق محفوظة لشركة (مبارك) لعام 2026</span>
        </div>
      </div>
    </footer>
  );
}
