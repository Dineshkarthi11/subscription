import React from 'react'
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';
import { PiClockThin } from 'react-icons/pi';
import ProgressBarMulti from '../Payroll/Dashboard/ProgressBarMulti';

export default function DataInPercentage({
  data = [],
  data2 = [],
  progressbar = false,
}) {
  const { t } = useTranslation();

  const categories = [
    { label: "Present", percentage: 40, color: "#61C451" },
    { label: "Absent", percentage: 30, color: "#F97952" },
    { label: "Onleave", percentage: 30, color: "#FAC35A" },
    { label: "HalfDay", percentage: 20, color: "#989898" },
  ];

  return (
    <div>
      <div className="w-full rounded-sm sm:w-full ">
        <div className="bg-white rounded-xl borderb p-3 flex flex-col dark:bg-black dark:text-white gap-5 h-40 sm:h-28">
          <div className='grid grid-cols-1 items-center sm:grid-cols-2'>
            <div className='flex'>
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`flex items-center justify-center w-1/5 sm:w-1/5`}>
                    <div className="ml-4">
                      <p className="para">{item.title}</p>
                      <h1 className="flex items-center h1 mt-1 gap-1">
                        {item.icon ? item.icon : ""}
                        <b>{item.value}</b>
                      </h1>
                    </div>
                  </div>
                  {index !== data.length - 1 && (
                    <div className="h-divider !border-gray-300 mt-2 mb-2"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {data2 &&
              <div className='justify-center sm:justify-end flex items-center rounded-md bg-[#F8FAFC] mt-2 sm:mt-0' >
                {data2.map((item, index) => (
                  <div className='flex items-center gap-2' key={index}>
                    <div>
                      {item.icon ? item.icon : ""}
                    </div>
                    <div className='flex flex-col gap-0.5'>
                      <p className='para'>{item.title}</p>
                      <h1 className="flex items-center h1 gap-1">
                        {item.value}
                      </h1>
                    </div>
                    {index !== data2.length - 1 && (
                      <div className="h-divider !border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            }

          </div>
          {progressbar &&
            <ProgressBarMulti categories={categories} showPercentage={false} className='h-auto'/>
          }
        </div>
      </div>
    </div>
  );
}
