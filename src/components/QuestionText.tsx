export function QuestionText({ text }: { text: string }) {
  return (
    <div className='flex items-center h-32'>
      <h1
        className='mb-4 font-bold '
        style={{
          lineHeight: '100%',
          fontSize: `2.5rem`,
        }}
      >
        {text}
      </h1>
    </div>
  );
}
