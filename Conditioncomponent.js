import React, { useState } from 'react'
import ToggleBtn from './ToggleBtn'
import { useTranslation } from "react-i18next";
import RadioButton from './RadioButton';
import { Button, Radio } from 'antd';
import Dropdown from './Dropdown';
import FormInput from './FormInput';
import { DownOutlined } from "@ant-design/icons";
import Accordion from './Accordion';
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoAdd } from "react-icons/io5";


const Conditioncomponent = () => {

  const { t } = useTranslation();

  const LeaveType = [
    {
      id: 1,
      label: t("Between"),
      value: "Between",
    },
    {
      id: 2,
      label: t("Greater_than_and_equal_to"),
      value: "Greater than and equal to",
    },
    {
      id: 3,
      label: t("Less_than"),
      value: "Less than",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isToggleButtonActive, setToggleButtonActive] = useState(false);

  const handleRadioChange = (e) => {
    setSelectedOption(e);

  };
  const [cardHeight, setCardHeight] = useState('50px');

  const handleToggleButtonChange = (e) => {
    setCardHeight(showDetails ? '50px' : '150px');
    setToggleButtonActive(e);
  };
  const [isButtonPressed1, setIsButtonPressed1] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isAnotherButtonPressed, setIsAnotherButtonPressed] = useState(false);


  const [showDetails, setShowDetails] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  // Function to check if a button is active
  const isButtonActive = (buttonKey) => {
    return activeButton === buttonKey;
  };
  const [presentage, setPresentage] = useState(0);
  // Function to handle button click
  const handleButtonClick = (buttonKey) => {
    setActiveButton(buttonKey);
    setIsButtonPressed(buttonKey === 'partiallyPaid')

    // Add any other logic you need for button click
  };

  const [isAddingCondition, setIsAddingCondition] = useState(true);

  const handleAddAnotherCondition = () => {
    setIsAnotherButtonPressed(true);
    setIsAddingCondition(false);
  };
  const handleDeleteCondition = () => {
    // Your logic for handling "Delete Condition"
    setIsAddingCondition(true);
    setIsAnotherButtonPressed(false);
  };


  return (
    <><><div className="w-full h-[400px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 inline-flex ml-0">
      <div class="self-stretch justify-start items-center  inline-flex">
        {/* <div class="text-black text-sm font-medium font-['Inter'] leading-tight">Condition 1</div> */}
      </div>
      <div class="self-stretch h-[270px] px-4 py-6 flex-col justify-center items-start gap-4 flex">
        <div class="flex-col justify-start items-start gap-5 flex">
          <div class="text-black text-sm font-medium font-['Inter'] leading-tight">{t("If_the_employees_leave_allowance_used_is")}</div>
          <div class="flex-col justify-start items-start gap-3.5 flex">
            <div class="justify-start items-start gap-8 inline-flex">
              <RadioButton

                options={LeaveType}
                change={(e) => handleRadioChange(e)}
              >
                <Radio value={t("Between")}>{t("Between")}</Radio>
                <Radio value={t("Greater_than_and_equal_to")}>{t("Greater_than_and_equal_to")}</Radio>
                <Radio value={t("Less_than")}>{t("Less_than")}</Radio>
              </RadioButton>

            </div>
            <div class="justify-center items-center gap-3 inline-flex">

              {selectedOption === "Between" && (
                <>
                  <div class="flex gap-4 items-center">
                    <p
                    >{t("Leave_used_Between")}</p>
                    <FormInput

                      placeholder={t("Days")}
                    />
                    {t("Or")}
                    <FormInput

                      placeholder={t("Days")}
                    />

                  </div>

                </>
              )}
              {selectedOption === "Greater than and equal to" && (
                <div class="flex gap-4 items-center">
                  <p>{t("Leave_used_Greater_than_or_equal_to")}</p>
                  <FormInput

                    placeholder={t("values")}
                  />
                </div>
              )}
              {selectedOption === "Less than" && (
                <div class="flex gap-4 items-center">
                  <p>{t("Leave_used_Less_than")}</p>
                  <FormInput

                    placeholder={t("values")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="w-full h-[0px] border border-black border-opacity-5"></div>
      <div class="flex gap-4  ml-5 mt-5">
        <p>{t("Pay_rate_for_this_policy")}</p>
      </div>
      <div class="flex gap-4  ml-5 mt-2">
        <Button
          style={{
            backgroundColor: isButtonActive('paid') ? '#6A4BFC' : 'white',
            color: isButtonActive('paid') ? 'white' : 'black',
            border: `1px solid ${isButtonActive('paid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
          }}
          onClick={() => handleButtonClick('paid')}
        >
          {t("Paid_Leave")}
        </Button>
        <Button
          style={{
            backgroundColor: isButtonActive('unpaid') ? '#6A4BFC' : 'white',
            color: isButtonActive('unpaid') ? 'white' : 'black',
            border: `1px solid ${isButtonActive('unpaid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
          }}
          onClick={() => handleButtonClick('unpaid')}
        >
          {t("Unpaid_Leave")}
        </Button>
        <Button
          style={{
            backgroundColor: isButtonActive('partiallyPaid') ? '#6A4BFC' : 'white',
            color: isButtonActive('partiallyPaid') ? 'white' : 'black',
            border: `1px solid ${isButtonActive('partiallyPaid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
          }}
          onClick={() => handleButtonClick('partiallyPaid')}
        >
          {t("Partially_Paid_Leave")}
        </Button>
      </div>
      {activeButton && activeButton === 'partiallyPaid' && (
        <div class="flex gap-4 items-center ml-5 ">
          <FormInput
            title={t("Percentage_Paid")}
            placeholder={t("Percentage")} />
          <FormInput
            title={t("Pay Calculation")}
            placeholder={t("Basic_Salary")} />
          <FormInput
            title={t("Days")}
            placeholder={t("Calendar_Days")} />
        </div>
      )}

      {activeButton && activeButton === 'unpaid' && (


        <div class="flex gap-4 items-center ml-5 ">
          <FormInput
            title={t("Pay_Calculation")}
            placeholder={t("Basic_Salary")} />
          <FormInput
            title={t("Days")}
            placeholder={t("Calendar_Days")} />
        </div>



      )}




    </div>
      <div class="ml-5 mt-2">
        {/* <Button onClick={isAddingCondition ? handleAddAnotherCondition : handleDelet eCondition}>
        {isAddingCondition ? 'Add Another Condition' : 'Delete Condition'}
      </Button> */}
        {isAddingCondition ? (

          <Button onClick={handleAddAnotherCondition} >
            <div class="flex gap-4"> <IoAdd />
            {t("Add_Another_Condition")}</div>
          </Button>
        ) : (
          <Button onClick={handleDeleteCondition} type="primary" danger ghost>
            <div class="flex gap-4 items-center">
              <MdOutlineDeleteForever />
              {t("Delete_Condition")}
            </div>
          </Button>
        )}
      </div>
    </>
      <div className="w-full h-[0px] border border-black border-opacity-5"></div>

      {isAnotherButtonPressed && <Conditioncomponent />}



    </>
  )
}

export default Conditioncomponent