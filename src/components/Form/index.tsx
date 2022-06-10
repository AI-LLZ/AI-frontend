import "./Form.css";

const formInitValue: FormPayload = {
  age: 0,
  asthma: false,
  breathing_difficulty: false,
  chronic_lung_disease: false,
  cold: false,
  cough: false,
  diabetes: false,
  diarrhea: false,
  english_proficient: false,
  fatigue: false,
  fever: false,
  gender: "Other",
  have_covid: false,
  hypertension: false,
  ischemic_heart_disease: false,
  loss_taste: false,
  muscle_pain: false,
  other_preexisting_contidion: false,
  other_respiratory_ailment: false,
  pneumonia: false,
  returning_user: false,
  smoking: false,
  sore_throat: false,
  vaccination: 0,
  wearing_mask: false
};

export const formReducer = (
  state: FormPayload | null,
  action: FormReducerAction
): FormPayload | null => {
  if (action.type === "reset") return formInitValue;
  if (state === null) return null;
  return { ...state, [action.type]: action.value };
};

const Form = ({ payload, dispatchPayload }: FormProps) => {
  if (payload === null) return <></>;

  return (
    <div className="Form">
      <div className="Form__grid">
        <div className="Form__grid-item">
          <label>Age</label>
          <input
            className="Form__input"
            max={120}
            min={0}
            onChange={e =>
              dispatchPayload({
                type: "age",
                value: parseInt(e.target.value, 10)
              })
            }
            type="number"
            value={payload.age}
          />
        </div>
        <div className="Form__grid-item">
          <label>Gender</label>
          <select
            className="Form__input"
            onChange={e =>
              dispatchPayload({ type: "gender", value: e.target.value })
            }
            value={payload.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="Form__grid-item">
          <label>My vaccination status</label>
          <select
            className="Form__input"
            onChange={e =>
              dispatchPayload({
                type: "vaccination",
                value: parseInt(e.target.value, 10)
              })
            }
            value={payload.vaccination}
          >
            <option value={2}>2 doses</option>
            <option value={1}>1 dose</option>
            <option value={0}>0 dose</option>
          </select>
        </div>
      </div>
      <div>Check the following if it matches you.</div>
      <div className="Form__grid">
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "english_proficient",
              value: !payload.english_proficient
            })
          }
        >
          <input
            checked={payload.english_proficient}
            readOnly
            type="checkbox"
          />
          <label>I'm proficient in English.</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "returning_user",
              value: !payload.returning_user
            })
          }
        >
          <input checked={payload.returning_user} readOnly type="checkbox" />
          <label>I'm returning user.</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "wearing_mask",
              value: !payload.wearing_mask
            })
          }
        >
          <input checked={payload.wearing_mask} readOnly type="checkbox" />
          <label>I'm wearing a mask.</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "smoking", value: !payload.smoking })
          }
        >
          <input checked={payload.smoking} readOnly type="checkbox" />
          <label>I have smoking habits.</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "have_covid", value: !payload.have_covid })
          }
        >
          <input checked={payload.have_covid} readOnly type="checkbox" />
          <label>I got COVID-19 (tested positive).</label>
        </div>
      </div>
      <div>I have the following symptoms:</div>
      <div className="Form__grid">
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "cold", value: !payload.cold })
          }
        >
          <input checked={payload.cold} readOnly type="checkbox" />
          <label>Cold</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "cough", value: !payload.cough })
          }
        >
          <input checked={payload.cough} readOnly type="checkbox" />
          <label>Cough</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "fever", value: !payload.fever })
          }
        >
          <input checked={payload.fever} readOnly type="checkbox" />
          <label>Fever</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "diarrhea", value: !payload.diarrhea })
          }
        >
          <input checked={payload.diarrhea} readOnly type="checkbox" />
          <label>Diarrhea</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "sore_throat",
              value: !payload.sore_throat
            })
          }
        >
          <input checked={payload.sore_throat} readOnly type="checkbox" />
          <label>Sore Throat</label>
        </div>
      </div>
      <div>I have these conditions:</div>
      <div className="Form__grid">
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "loss_taste", value: !payload.loss_taste })
          }
        >
          <input checked={payload.loss_taste} readOnly type="checkbox" />
          <label>Loss of smell of taste</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "muscle_pain",
              value: !payload.muscle_pain
            })
          }
        >
          <input checked={payload.muscle_pain} readOnly type="checkbox" />
          <label>Muscle pain</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "fatigue", value: !payload.fatigue })
          }
        >
          <input checked={payload.fatigue} readOnly type="checkbox" />
          <label>Fatigue</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "breathing_difficulty",
              value: !payload.breathing_difficulty
            })
          }
        >
          <input
            checked={payload.breathing_difficulty}
            readOnly
            type="checkbox"
          />
          <label>Breathing Difficulties</label>
        </div>
      </div>
      <div>I have these respiratory ailments:</div>
      <div className="Form__grid">
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "pneumonia", value: !payload.pneumonia })
          }
        >
          <input checked={payload.pneumonia} readOnly type="checkbox" />
          <label>Pneumonia</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "asthma", value: !payload.asthma })
          }
        >
          <input checked={payload.asthma} readOnly type="checkbox" />
          <label>Asthma</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "chronic_lung_disease",
              value: !payload.chronic_lung_disease
            })
          }
        >
          <input
            checked={payload.chronic_lung_disease}
            readOnly
            type="checkbox"
          />
          <label>Chronic Lung Disease</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "other_respiratory_ailment",
              value: !payload.other_respiratory_ailment
            })
          }
        >
          <input
            checked={payload.other_respiratory_ailment}
            readOnly
            type="checkbox"
          />
          <label>Others</label>
        </div>
      </div>
      <div>I have these pre-existing conditions:</div>
      <div className="Form__grid">
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "hypertension",
              value: !payload.hypertension
            })
          }
        >
          <input checked={payload.hypertension} readOnly type="checkbox" />
          <label>Hypertension</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "ischemic_heart_disease",
              value: !payload.ischemic_heart_disease
            })
          }
        >
          <input
            checked={payload.ischemic_heart_disease}
            readOnly
            type="checkbox"
          />
          <label>Ischmeic Heart Disease</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({ type: "diabetes", value: !payload.diabetes })
          }
        >
          <input checked={payload.diabetes} readOnly type="checkbox" />
          <label>Diabetes</label>
        </div>
        <div
          className="Form__grid-item"
          onClick={() =>
            dispatchPayload({
              type: "other_preexisting_contidion",
              value: !payload.other_preexisting_contidion
            })
          }
        >
          <input
            checked={payload.other_preexisting_contidion}
            readOnly
            type="checkbox"
          />
          <label>Others</label>
        </div>
      </div>
    </div>
  );
};

export default Form;
