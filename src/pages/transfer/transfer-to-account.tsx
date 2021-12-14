import { RouteComponentProps } from "@reach/router";
import { FormEvent, FunctionComponent, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import Switch from "../../components/switch/Switch";
import { banks } from "../../utils/constants";
import { numberRender } from "../../utils/helpers/render";
import { getOptionsFromArray } from "../../utils/helpers/type-conversions";
import styles from "./transfer.module.scss";

const initialFormData = {
  accountNumber: "",
  bank: "",
  beneficiaryName: "",
  amount: "",
  beneficiaryPhone: "",
  remark: "",
  saveBeneficiary: true,
  cardNumber: "",
  expiryDate: "",
  CCV: "",
  pin: ""
};

const bankOptions = getOptionsFromArray(banks);

const IndexPage: FunctionComponent<RouteComponentProps> = () => {
  const [currentPage, setCurrentPage] = useState<"left" | "right">("left");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const goToNext = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage("right");
  };

  return (
    <main className={styles["content-layout"]}>
      <div
        className={[styles.left, currentPage === "left" && styles.active].join(
          " "
        )}
      >
        <form className={styles.form} onSubmit={goToNext}>
          <div className="input-group">
            <span className="question">Account Number</span>
            <Input
              value={formData.accountNumber}
              placeholder="Account Number"
              onChange={value => handleChange("accountNumber", value)}
            />
          </div>

          <div className="input-group">
            <span className="question">Bank</span>
            <Select
              value={formData.bank}
              placeholder="Select Bank"
              onSelect={value => handleChange("bank", String(value))}
              options={bankOptions}
              responsive
            />
          </div>

          <div className="input-group">
            <span className="question">Beneficiary Name</span>
            <Input
              value={formData.beneficiaryName}
              placeholder="Beneficiary's Name"
              onChange={value => handleChange("beneficiaryName", value)}
            />
          </div>

          <div className="input-group">
            <span className="question">Amount</span>
            <Input
              value={formData.amount}
              placeholder="Enter Amount"
              onChange={value => handleChange("amount", value)}
              number
              startSymbol="₦"
            />
          </div>

          <div className="input-group">
            <span className="question">Beneficiary Mobile Number</span>
            <Input
              value={formData.beneficiaryPhone}
              placeholder="Beneficiary's Mobile number"
              onChange={value => handleChange("beneficiaryPhone", value)}
            />
          </div>

          <div className="input-group">
            <span className="question">Remark</span>
            <Input
              value={formData.remark}
              placeholder="Remark (e.g Transfer to ABC)"
              onChange={value => handleChange("remark", value)}
            />
          </div>

          <div className="input-group">
            <Switch
              checked={formData.saveBeneficiary}
              onChange={checked => handleChange("saveBeneficiary", checked)}
              text={<strong>Save Beneficiary</strong>}
              textAfterSwitch
            />
          </div>

          <Button buttonType="submit" className="block margin-top spaced">
            Continue
          </Button>
        </form>
      </div>
      <div
        className={[
          styles.right,
          currentPage === "right" && styles.active
        ].join(" ")}
      >
        <div className={styles.form}>
          <h2 className="center vertical-margin wide">Transfer to Account</h2>
          <br />
          <div className="flex between vertical-margin">
            <span className="larger xxl">
              {formData.amount || numberRender(0)}
            </span>
            <Button onClick={() => setCurrentPage("left")} type="accent">
              EDIT
            </Button>
          </div>

          <div className="input-group">
            <span className="question">Card Number</span>
            <Input
              value={formData.cardNumber}
              onChange={value => handleChange("cardNumber", value)}
              placeholder="Card Number"
            />
          </div>

          <div className="flex">
            <div className="half-width">
              <Input
                value={formData.expiryDate}
                onChange={value => handleChange("expiryDate", value)}
                placeholder="Expiry (MM/YY)"
              />
            </div>
            <div className="half-width">
              <Input
                value={formData.CCV}
                onChange={value => handleChange("CCV", value)}
                placeholder="CVV"
              />
            </div>
          </div>

          <div className="input-group">
            <span className="question">PIN</span>
            <Input
              value={formData.pin}
              placeholder="PIN"
              onChange={value => handleChange("pin", value)}
            />
          </div>

          <br />
          <Button className="block margin-top spaced">PAY</Button>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
