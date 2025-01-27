'use client'

import Image from "next/image";
import { useEffect, useState } from "react"
import Details from "@/components/Details";

interface Session {
  id: number;
  location: string;
  date: string;
  time: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export default function Home() {

  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    countryCode: 'HK +852',
    sessionId: '',
    guest: {
      detailTitle: 'Mr.',
      detailFirstName: '',
      detailLastName: ''
    }
  })
  const [sessions, setSessions] = useState<Session[]>([]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('提交成功！');

        setFormData({
          title: 'Mr.',
          firstName: '',
          lastName: '',
          mobile: '',
          email: '',
          countryCode: 'HK +852',
          sessionId: '',
          guest: {
            detailTitle: 'Mr.',
            detailFirstName: '',
            detailLastName: ''
          }
        });
      } else {
        alert('提交失敗，請稍後再試。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('發生錯誤，請稍後再試。');
    } finally {
      setIsSubmitting(false)
    }
  };
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:3001/sessions');
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const handleInputChange = (e: { target: { name: string, value: string } }) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      guest: {
        ...prev.guest,
        [name]: value
      }

    }));
  };

  return (
    <div className="min-h-screen bg-black/10 w-screen">
      <div className="container w-screen">
        <div className="w-screen h-[600px] relative">
          <Image
            src="/img-22.jpg"
            fill
            quality={100}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            alt="File icon"
          />

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-black/80 to-black p-8 flex flex-col justify-center items-center">
            <h1 className="text-white text-7xl font-bold tracking-wider font-serif">
              PANERAl
            </h1>
            <p className="text-white text-3xl font-light tracking-wide">
              Private Masterclass
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] h-screen text-gray-500">
          <div className="w-full h-[150px] flex flex-col justify-around py-6">
            Join us for a private masterclass with Panerai watchmaker to experience the craft of watchmaking and enjoy the exclusive preview of latest collection at our Landmark Prince's boutique.
            <span><br />Participants should be at least 18 years of age.</span>
          </div>
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-500 font-medium mb-2">
                  TITLE 尊稱 *
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-[550px] bg-neutral-800 text-white p-2 rounded border border-neutral-700 focus:outline-none focus:text-gray-200 hover:bg-neutral-700"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>

              <div className="flex gap-6">
                <div>
                  <label className="block text-gray-500 font-medium mb-2">
                    FIRST NAME 名字 *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-[550px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 font-medium mb-2">
                    LAST NAME 姓氏 *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-[550px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div>
                  <label className="block text-gray-500 font-medium mb-2">
                    MOBILE 手提電話 *
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-[100px] bg-neutral-800 text-gray-300 p-1 rounded border border-neutral-700 focus:outline-none focus:text-gray-200 hover:bg-neutral-700"
                    >
                      <option value="HK +852" >HK +852</option>
                      <option value="Macau +853" >Macau +853</option>
                      <option value="China +86">China +86</option>
                    </select>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-[438px] bg-neutral-800 text-gray-300 p-1 rounded border border-neutral-700 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-2">
                    E-MAIL 電郵地址 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-[550px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:focus:border-gray-400"
                  />
                </div>
              </div>
              <div className="py-1">
                <input
                  type="checkbox"
                  checked={showDetails}
                  onChange={(e) => setShowDetails(e.target.checked)}
                  className="mr-4 checked:bg-gray-500 cursor-pointer"
                />
                Additional Guest Details (Each participant can bring one guest only)
              </div>
              {showDetails && <Details
                guestData={formData.guest}
                onChange={handleInputChange}
              />}
              <div >
                <p className="text-xl font-bold ">BOOK NOW FOR FREE</p>
                <ul className="list-disc pl-4">
                  <li>Each booking serves for one individual only.</li>
                  <li>Each session serves 2 people only. First come first served.</li>
                </ul>
                <div className="text-xs py-2 mt-2">Thanks for your interest in Panerai workshop. All sessions are fully booked for now. Please fill in your details and you will be added to waiting list for upcoming sessions. We shall contact you once new sessions are open.</div>
                <select
                  name="sessionId"
                  value={formData.sessionId}
                  onChange={handleInputChange}
                  className="w-[1126px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:text-gray-200 hover:bg-neutral-700"
                >
                  <option value="">請選擇時段及地點</option>
                  <optgroup label="觀塘 Kwun Tong">
                    {/* {sessions
                      .filter(session => session.location.includes('觀塘'))
                      .map(session => (
                        <option key={session.id} value={session.id}>
                          {`${session.date} ${session.time} ${session.location}`}
                        </option>
                      ))} */}
                  </optgroup>
                  <optgroup label="將軍澳 Tseung Kwan O">
                    {/* {sessions
                      .filter(session => session.location.includes('將軍澳'))
                      .map(session => (
                        <option key={session.id} value={session.id}>
                          {`${session.date} ${session.time} ${session.location}`}
                        </option>
                      ))} */}
                  </optgroup>
                </select>
              </div>
              <div className="flex flex-col space-y-4">
                <div>To provide you better experience, please answer below questions:</div>

                <div className="flex flex-col ">

                  <div>Do you know PANERAI before?</div>
                  <div className="flex items-center space-x-6 ml-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="yes"
                        name="know_panerai"
                        value="yes"
                        className="mr-2 text-gray-500"
                      />
                      <label htmlFor="yes" className="text-sm">Yes</label>
                    </div>

                    <div className="flex items-center ">
                      <input
                        type="radio"
                        id="no"
                        name="know_panerai"
                        value="no"
                        className="mr-2"
                      />
                      <label htmlFor="no" className="text-sm">No</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">

                  <div>Do you own a PANERAI watch?</div>
                  <div className="flex items-center space-x-6 ml-1">
                    <div className="flex items-center ">
                      <input
                        type="radio"
                        id="yes"
                        name="own_panerai"
                        value="yes"
                        className="mr-2"
                      />
                      <label htmlFor="yes" className="text-sm">Yes</label>
                    </div>

                    <div className="flex items-centerml-1">
                      <input
                        type="radio"
                        id="no"
                        name="own_panerai"
                        value="no"
                        className="mr-2"
                      />
                      <label htmlFor="no" className="text-sm">No</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">

                  <div>Do you own a mechanical watch?</div>
                  <div className="flex items-center space-x-6 ml-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="yes"
                        name="own_mechanical"
                        value="yes"
                        className="mr-2"
                      />
                      <label htmlFor="yes" className="text-sm">Yes</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="no"
                        name="own_mechanical"
                        value="no"
                        className="mr-2"
                      />
                      <label htmlFor="no" className="text-sm">No</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className=" w-[150px] p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                  >{isSubmitting ? '提交中...' : 'SUBMIT'}
                  </button>
                </div>

              </div>
            </form>
          </div>
          <div className="text-xs pb-8 my-6">By clicking submit, you agree to receive marketing information about Panerai's products or services. We may send you this information using e-mail, text, telephone or post. We may also use your information to deliver personalised messages or advertising on social media or other digital platforms.
            You can ask us to stop marketing to you at any time. For further information about how we use your personal information,
            please see our Privacy Policy.</div>
        </div>
      </div>
    </div>
  );
}
