import ScaleInput from "./ScaleInput";
import TextInput from "./TextInput";
import ChoiceInput from "./ChoiceInput";
import SliderInput from "./SliderInput";
import ConsentInput from "./ConsentInput";
import DropdownInput from "./DropdownInput";
import GridSlider from "./GridSlider";

export default function Question({ question, value, onChange }) {
  switch (question.type) {
    case "scale":
      return <ScaleInput question={question} value={value} onChange={onChange} />;
    case "slider":
      return <SliderInput question={question} value={value} onChange={onChange} />;
    case "text":
      return <TextInput question={question} value={value} onChange={onChange} />;
    case "multiple-choice":
    case "single-choice":
      return <ChoiceInput question={question} value={value} onChange={onChange} />;
    case "dropdown":
      return <DropdownInput question={question} value={value} onChange={onChange} />;
    case "consent":
      return <ConsentInput question={question} value={value} onChange={onChange} />;
    case "grid":
      return <GridSlider question={question} value={value} onChange={onChange} />;
    default:
      return (
        <p className="text-[var(--color-signal)] font-mono text-sm">
          Unknown question type: {question.type}
        </p>
      );
  }
}
