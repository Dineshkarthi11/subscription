import React, { useState } from 'react'
import ToggleBtn from './ToggleBtn'
import { useTranslation } from "react-i18next";
import RadioButton from './RadioButton';
import { Button, Radio } from 'antd';
import Dropdown from './Dropdown';
import FormInput from './FormInput';
import { DownOutlined } from "@ant-design/icons";
import Accordion from './Accordion';
import Conditioncomponent from './Conditioncomponent';
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoAdd } from "react-icons/io5";


const Leacecomponent = () => {

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
    // console.log(e)

  };
  const [cardHeight, setCardHeight] = useState('50px');

  const handleToggleButtonChange = (e) => {
    setCardHeight(showDetails ? '50px' : '150px');
    setToggleButtonActive(e);
    // console.log(e)
  };
  const [isButtonPressed1, setIsButtonPressed1] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
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
    setActiveButton((prevButton) => (prevButton === buttonKey ? '' : buttonKey));
    setPresentage(0);
    // console.log("button value", activeButton) // Reset presentage on each button click
  };
  // const handleButtonClick1 = (buttonKey) => {
  //   setActiveButton(buttonKey);
  //   setIsButtonPressed1(buttonKey === 'partiallyPaid1')
  //   // Add any other logic you need for button click
  // };


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


    <>
      <div className='.Container_padding'>
        <Accordion
          title={t("Create_Late_Entry_Policy")}

          padding={false}
          toggleBtn={false}
          click={() => {
            setPresentage(1.4);

          }}
          className="Text_area"
        >
          <div class="flex gap-4 items-center ml-5 mt-5">
            <ToggleBtn change={(e) => handleToggleButtonChange(e)} />
            <div id="Text1" className="text-sm font-medium leading-[20px]">
              {t("Set_conditional_pay_rate_based_on_employees_leave_allowance_used")}
            </div>
          </div>

          {isToggleButtonActive && (


            <><><div className="w-full h-[400px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 inline-flex">
              <div class="self-stretch justify-start items-center  inline-flex">
                {/* <div class="text-black text-sm font-medium font-['Inter'] leading-tight">Condition 1</div> */}
              </div>
              <div class="self-stretch h-[270px] px-4 py-6  flex-col justify-center items-start gap-4 flex">
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

                      {selectedOption && selectedOption === "Between" && (
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
                    backgroundColor: isButtonActive("paid") ? '#e6e1ed' : 'white',
                    color: isButtonActive("paid") ? '#6A4BFC' : 'black',
                    border: `1px solid ${isButtonActive("paid") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                    position: 'relative' // To position the tick mark inside the button
                  }}
                  onClick={() => handleButtonClick("paid")} // Add your onClick handler
                >
                  {isButtonActive("paid") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <span style={{ paddingLeft: '1.25rem' }}>{t("Paid_Leave")}</span>
                </Button>

                <Button
                  style={{
                    backgroundColor: isButtonActive("unpaid") ? '#e6e1ed' : 'white',
                    color: isButtonActive("unpaid") ? '#6A4BFC' : 'black',
                    border: `1px solid ${isButtonActive("unpaid") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                    position: 'relative' // To position the tick mark inside the button
                  }}
                  onClick={() => handleButtonClick("unpaid")} // Add your onClick handler
                >
                  {isButtonActive("unpaid") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <span style={{ paddingLeft: '1.25rem' }}>{t("Unpaid_Leave")}</span>
                </Button>

                <Button
                  style={{
                    backgroundColor: isButtonActive("partiallyPaid") ? '#e6e1ed' : 'white',
                    color: isButtonActive("partiallyPaid") ? '#6A4BFC' : 'black',
                    border: `1px solid ${isButtonActive("partiallyPaid") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                    position: 'relative' // To position the tick mark inside the button
                  }}
                  onClick={() => handleButtonClick("partiallyPaid")} // Add your onClick handler
                >
                  {isButtonActive("partiallyPaid") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <span style={{ paddingLeft: '1.25rem' }}>{t("Partially_Paid_Leave")}</span>
                </Button>

              </div>
              {activeButton && activeButton === 'partiallyPaid' && (
                <div class="flex gap-4 items-center ml-5 ">
                  <FormInput
                    title={t("Percentage_Paid")}
                    placeholder={t("Percentage")} />
                  <FormInput
                    title={t("Pay_Calculation")}
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
                    <div class="flex gap-4 items-center"> <IoAdd />
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


          )}



          <div class="card_width_hight self-stretch h-[400px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 flex">
            <div id="Text1" className=" text-sm font-medium leading-[20px] ">
              {t("What_is_the_default_leave_pay_rate_for_this_policy")}
            </div>
            <div className="w-[811px] text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">
              <p>{t("Set_a_default_rate_for_leaves_when_an_employee_does_not_match_any_pay_rate_condition")}</p>
            </div>


            <div class="flex gap-4">
              <Button
                style={{
                  backgroundColor: isButtonActive("paid1") ? '#e6e1ed' : 'white',
                  color: isButtonActive("paid1") ? '#6A4BFC' : 'black',
                  border: `1px solid ${isButtonActive("paid1") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                  position: 'relative' // To position the tick mark inside the button
                }}
                onClick={() => handleButtonClick("paid1")} // Add your onClick handler
              >
                {isButtonActive("paid1") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                <span style={{ paddingLeft: '1.25rem' }}>{t("Paid_Leave")}</span>
              </Button>

              <Button
                style={{
                  backgroundColor: isButtonActive("unpaid1") ? '#e6e1ed' : 'white',
                  color: isButtonActive("unpaid1") ? '#6A4BFC' : 'black',
                  border: `1px solid ${isButtonActive("unpaid1") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                  position: 'relative' // To position the tick mark inside the button
                }}
                onClick={() => handleButtonClick("unpaid1")} // Add your onClick handler
              >
                {isButtonActive("unpaid1") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                <span style={{ paddingLeft: '1.25rem' }}>{t("Unpaid_Leave")}</span>
              </Button>

              <Button
                style={{
                  backgroundColor: isButtonActive("partiallyPaid1") ? '#e6e1ed' : 'white',
                  color: isButtonActive("partiallyPaid1") ? '#6A4BFC' : 'black',
                  border: `1px solid ${isButtonActive("partiallyPaid1") ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
                  position: 'relative' // To position the tick mark inside the button
                }}
                onClick={() => handleButtonClick("partiallyPaid1")} // Add your onClick handler
              >
                {isButtonActive("partiallyPaid1") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-6A4BFC"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                <span style={{ paddingLeft: '1.25rem' }}>{t("Partially_Paid_Leave")}</span>
              </Button>

            </div>

            {activeButton && activeButton === 'partiallyPaid1' && (
              <div class="flex gap-4 items-center ml-5 ">
                <FormInput
                  title={t("Percentage_Paid")}
                  placeholder={t("Percentage")} />
                <FormInput
                  title={t("Pay_Calculation")}
                  placeholder={t("Basic_Salary")} />
                <FormInput
                  title={t("Days")}
                  placeholder={t("Calendar_Days")} />
              </div>
            )}

            {activeButton && activeButton === 'unpaid1' && (


              <div class="flex gap-4 items-center ml-5 ">
                <FormInput
                  title={t("Pay_Calculation")}
                  placeholder={t("Basic_Salary")} />
                <FormInput
                  title={t("Days")}
                  placeholder={t("Calendar_Days")} />
              </div>



            )}

            <div class="text-black text-sm font-medium font-['Inter'] leading-tight mt-10">{t("How_should_the_daily_wage_be_calculated_for_unpaid_percentage_of_leaves")}</div>
            <div class="w-[471px] text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">{t("Set_a_method_for_calculating_the_daily_wage_for_the_portion_of_leaves_that_are_unpaid")}</div>
            <div class="items-center gap-3 inline-flex" >
              <FormInput
                title={t("Calendar_Days")}
                placeholder={t("values")}
                required={true} />
              <FormInput
                title={t("Until_before")}
                placeholder={t("values")}
                required={true} />

            </div>

          </div>
        </Accordion>
      </div>


    </>
  )
}

export default Leacecomponent