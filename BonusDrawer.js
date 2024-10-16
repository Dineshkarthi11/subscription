import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import DrawerPop from './DrawerPop';
import FormInput from './FormInput';
import RangeDatePicker from './RangeDatePicker';
import DateSelect from './DateSelect';
import FlexCol from './FlexCol';
import TextArea from './TextArea';
import { Flex } from 'antd';
import imag from "../../assets/images/image 1489.png"
import ToggleBtn from './ToggleBtn';
function BonusDrawer({ open,
    close = () => { }, }) {
    const { t } = useTranslation();
    const [show, setShow] = useState(open);

    const handleClose = () => {
        close(false);
    };
  return (
      <DrawerPop
          open={show}
          close={(e) => {
              handleClose();
              close(e);
          }}
          contentWrapperStyle={
              {
                  // maxWidth: "600px",
              }
          }
          //   handleSubmit={(e) => {
          //       formik.handleSubmit();
          //   }}
          //   updateBtn={UpdateBtn}
          updateFun={() => {
              //   UpdateIdBasedCountry();
          }}
          header={[
              t("Bonus"),

              t("Manage you companies here, and some lorem ipsu")

          ]}
      //   btnName="Submit"
      //   saveAndContinue={true}
      //   footerBtn={[t("Cancel"), !UpdateBtn ? t("Submit") : t("")]}
          footerBtn={[t("Cancel"), t("Save")]}
      >
          <FlexCol >
              <div className='grid grid-cols-2 gap-4'>
                  <DateSelect title='Entry Date' />
                  <FormInput title='Amount' />
              </div>
              <TextArea title='Description'
                  placeholder='Description' />


              <Flex gap={3}
                  justify='space-between'
                  className={"w-full border rounded-xl bg-white p-2 dark:bg-gray-600 items-center"}>
                  <div className='flex gap-3 items-center'>
                      <img src={imag} />
                      <div>
                          <p className='font-semibold text-xs 2xl:text-sm'>Send notification to staff</p>
                          <p className='text-xs 2xl:text-sm text-grey'>Allow staff to receive important notification via message</p>
                      </div>

                  </div>

                  <ToggleBtn />
              </Flex>
          </FlexCol>

      </DrawerPop>
  )
}

export default BonusDrawer
