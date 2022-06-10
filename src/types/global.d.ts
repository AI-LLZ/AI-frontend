interface FormProps {
  payload: FormPayload | null;
  dispatchPayload: React.Dispatch<FormReducerAction>;
}

interface FormPayload {
  age: number;
  asthma: boolean;
  breathing_difficulty: boolean;
  chronic_lung_disease: boolean;
  cold: boolean;
  cough: boolean;
  diabetes: boolean;
  diarrhea: boolean;
  english_proficient: boolean;
  fatigue: boolean;
  fever: boolean;
  gender: "Male" | "Female" | "Other";
  have_covid: boolean;
  hypertension: boolean;
  ischemic_heart_disease: boolean;
  loss_taste: boolean;
  muscle_pain: boolean;
  other_preexisting_contidion: boolean;
  other_respiratory_ailment: boolean;
  pneumonia: boolean;
  returning_user: boolean;
  smoking: boolean;
  sore_throat: boolean;
  vaccination: 0 | 1 | 2;
  wearing_mask: boolean;
}

type FormReducerAction = {
  type: keyof FormPayload | "reset";
  value?: boolean | number | string;
};
