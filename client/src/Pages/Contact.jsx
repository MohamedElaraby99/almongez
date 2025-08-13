import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import Layout from "../Layout/Layout";
import { 
  FaTelegram, 
  FaFacebook, 
  FaYoutube, 
  FaUser,
  FaComments,
  FaGlobe,
  FaPhone,
  FaWhatsapp
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import logo from "../assets/logo.png";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("جميع الحقول مطلوبة");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("بريد إلكتروني غير صحيح");
      return;
    }

    setIsLoading(true);
    const loadingMessage = toast.loading("جاري إرسال الرسالة...");
    try {
      const res = await axiosInstance.post("/contact", userInput);
      toast.success(res?.data?.message, { id: loadingMessage });
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("فشل إرسال الرسالة! حاول مرة أخرى", { id: loadingMessage });
    } finally {
      setIsLoading(false);
    }
  }

  const contactMethods = [
    { 
      name: "واتساب / اتصال", 
      icon: FaWhatsapp, 
      url: "https://wa.me/201125800332", 
      phone: "+201125800332",
      color: "hover:text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      isPhone: true
    },
    { 
      name: "Facebook", 
      icon: FaFacebook, 
      url: "https://www.facebook.com/people/MrMahmoud-Abdel-Aziz/100070094625467/?mibextid=ZbWKwL", 
      color: "hover:text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      name: "YouTube", 
      icon: FaYoutube, 
      url: "https://www.youtube.com/@mahmoudAbdel_Aziz", 
      color: "hover:text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <Layout>
      <section className="min-h-screen py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              تواصل معنا
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              تواصل مع الأستاذ محمود عبدالعزيز - خبير في الكيمياء ومدرس الكيمياء والعلوم المتكاملة
            </p>
          </div>

          {/* Contact Person Info */}
          <div className="text-center mb-16">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-6xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                محمود عبدالعزيز
              </h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                خبير في الكيمياء
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                مدرس الكيمياء والعلوم المتكاملة
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  طرق التواصل
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  تواصل مع الأستاذ محمود عبدالعزيز من خلال أي من هذه الطرق
                </p>
              </div>

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.url}
                    target={method.isPhone ? undefined : "_blank"}
                    rel={method.isPhone ? undefined : "noopener noreferrer"}
                    className={`group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${method.color} hover:scale-105`}
                    title={method.name}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <method.icon className={`text-2xl ${method.iconColor}`} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {method.name}
                      </h3>
                      {method.isPhone ? (
                        <p className="text-gray-600 dark:text-gray-300">
                          {method.phone}
                        </p>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          انقر للانتقال إلى {method.name}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                لماذا تختار الأستاذ محمود عبدالعزيز؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUser className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">خبرة متخصصة</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    خبير في الكيمياء مع سنوات من الخبرة في التدريس
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">منهج متكامل</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    تدريس الكيمياء والعلوم المتكاملة بأحدث الطرق
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaComments className="text-2xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">دعم مباشر</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    تواصل مباشر عبر الهاتف والواتساب للحصول على المساعدة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
