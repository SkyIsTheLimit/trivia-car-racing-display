import { AnswerChoiceButton } from './AnswerChoiceButton';
import { Menu as IMenu } from './utils/types';

export interface Menu {
  value: IMenu;
}

export function Menu({ value }: Menu) {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='mb-8 text-5xl'>{value.title}</h1>
      {value.options &&
        value.options.map((option, index) => (
          <AnswerChoiceButton
            key={index}
            color={index === value.highlighted ? 'green' : 'default'}
            state={index === value.highlighted ? 'pressed' : 'default'}
            option=''
          >
            {option}
          </AnswerChoiceButton>
        ))}
    </div>
  );
}
