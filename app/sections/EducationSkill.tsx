import { myEducations, mySkills } from '@/utils';
import styled from 'styled-components';
import { themes } from '@/utils/theme';
import { Text } from '@/components';
import { useGetSkillsQuery } from '@/redux';
import { useSelector } from '@/hooks/useActions';
import { Skeletons } from '@/components';

const EducationSkill = () => {
  useGetSkillsQuery();
  const { data, loading } = useSelector((state) => state.skills);

  return (
    <MoreAboutSection>
      <AboutTitle>
        <div className='title'>
          <Text transformed='capitalize'>More</Text>
          <Text
            colored
            transformed='capitalize'
          >
            About
          </Text>
          <Text transformed='capitalize'>Me</Text>
        </div>
        <div className='description'>
         Education and Skills are the key to success in life. 
        </div>
      </AboutTitle>

      <EducationAndSkill>
        <Educations>
          <div className='header-title'>My Educations</div>
          <Education>
            {myEducations.map((education) => (
              <div
                key={education.id}
                className='education-container'
              >
                <div className='education-institution'>
                  {education.institution}
                </div>
                <div className='education-yearn'>{education.year}</div>
                <div className='education-title'>{education.title}</div>
                <div className='education-descr'>{education.description}</div>
              </div>
            ))}
          </Education>
        </Educations>
        <Skills>
          <div className='header-title'>My Skills</div>
          <Skill>
            {loading ? (
              <Skeletons
                count={5}
              />
            ) : (
              data?.data?.map((skill) => (
                <div
                  key={skill._id}
                  className='skill-container'
                >
                  <div className='skill-content'>
                    <div className='title'>{skill.name}</div>
                    <div className='percentage'>{skill.percent}%</div>
                  </div>
                  <ProgressBar percentage={skill.percent} />
                </div>
              ))
            )}
          </Skill>
        </Skills>
      </EducationAndSkill>
    </MoreAboutSection>
  );
};

export default EducationSkill;

const MoreAboutSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 8rem;
  flex-direction: column;

  @media (max-width: 1138px) {
    padding: 0rem 5rem;
  }

  @media (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

const AboutTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .title {
    font-size: 3rem;
    font-weight: 900;
    color: ${themes.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .description {
    color: ${themes.tertiary};
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    .title {
      font-size: 2rem;
    }
  }
`;

const EducationAndSkill = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5rem;
  padding: 2rem 0rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 1138px) {
    padding: 0rem 5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 'left' 'right';
    padding: 0rem 1rem;
    grid-gap: 1rem;
  }
`;

const Educations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .header-title {
    font-size: 20px;
    font-weight: 900;
    color: ${themes.text};
  }
`;

const Education = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;

  .education-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.4rem;
  }

  .education-title {
    font-size: 14px;
    font-weight: 600;

    color: ${themes.secondary};
  }
  .education-institution {
    font-size: 14px;
    color: ${themes.text};
  }

  .education-yearn {
    font-size: 14px;
    font-weight: 600;
    color: ${themes.text};
  }

  .education-descr {
    font-size: 14px;
    color: ${themes.tertiary};
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  .header-title {
    font-size: 20px;
    font-weight: 900;
    color: ${themes.text};
  }
`;

const Skill = styled.div`
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;

  .skill-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 0.5rem;
  }

  .skill-content {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;

  .title {
    font-size: 14px;
    font-weight: 600;
    color: ${themes.text};
  }
  .percentage {
    font-size: 13px;
    font-weight: 400;
    color: ${themes.text};
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 5px;
  background: ${themes.tertiary};
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.percentage}%;
    height: 100%;
    background: ${themes.secondary};
  }
`;
