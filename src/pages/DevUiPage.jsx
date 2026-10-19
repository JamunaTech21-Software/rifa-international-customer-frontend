import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Banknote,
  BriefcaseBusiness,
  FileBadge,
  FileText,
  Globe,
  Headset,
  IdCard,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import CheckList from '@/components/ui/CheckList'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Container from '@/components/ui/Container'
import IconCircle from '@/components/ui/IconCircle'
import Logo from '@/components/ui/Logo'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/components/ui/Seo'
import Spinner from '@/components/ui/Spinner'
import Checkbox from '@/components/form/Checkbox'
import DateInput from '@/components/form/DateInput'
import FileDrop from '@/components/form/FileDrop'
import FormField from '@/components/form/FormField'
import PhoneInput from '@/components/form/PhoneInput'
import RadioGroup from '@/components/form/RadioGroup'
import Select from '@/components/form/Select'
import Textarea from '@/components/form/Textarea'
import TextInput from '@/components/form/TextInput'
import { ageFromDob } from '@/lib/age'
import { formatDateTime, formatFileSize, formatRm } from '@/lib/format'
import CategoryCard from '@/components/sections/CategoryCard'
import CtaBanner from '@/components/sections/CtaBanner'
import FeatureCard from '@/components/sections/FeatureCard'
import HelpBox from '@/components/sections/HelpBox'
import JobCard from '@/components/sections/JobCard'
import PageHero from '@/components/sections/PageHero'
import ProcessSteps from '@/components/sections/ProcessSteps'
import TrustStrip from '@/components/sections/TrustStrip'
import { categories } from '@/data/categories'
import { jobs } from '@/data/jobs'
import { steps5, steps6 } from '@/data/process'
import { site } from '@/data/site'

const TONES = ['blue', 'green', 'orange', 'purple', 'red', 'teal', 'navy', 'white']

const HOME_TRUST = [
  { icon: FileBadge, title: 'RL-693', text: 'Government Approved Recruiting Agency' },
  { icon: Users, title: 'Trusted Partner', text: 'Connecting Skilled Workers to Global Opportunities' },
  { icon: ShieldCheck, title: 'Safe & Legal Process', text: 'Full Compliance with BMET & BAIRA' },
  { icon: Headset, title: 'End-to-End Support', text: 'From Application to Departure' },
  { icon: BriefcaseBusiness, title: 'Better Future', text: 'Trusted by Thousands of Workers' },
]

const JOBS_TRUST = [
  { icon: ShieldCheck, title: 'Government', text: 'Approved (RL-693)', tone: 'navy' },
  { icon: Users, title: 'Trusted', text: 'Employers' },
  { icon: FileBadge, title: 'Safe & Legal', text: 'Recruitment' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Government Approved Recruiting Agency (RL-693)' },
  { icon: Users, title: 'Genuine Job Opportunities in Malaysia' },
  { icon: Banknote, title: 'Attractive Salary & Overtime' },
]
const CATEGORIES = categories.map((category) => ({ value: category.slug, label: category.name }))

const demoSchema = z.object({
  fullName: z.string().trim().min(3, 'Please enter your full name.'),
  mobile: z.string().regex(/^1[3-9]\d{8}$/, 'Enter a valid mobile number, e.g. 1712345678.'),
  dob: z.string().min(1, 'Please select your date of birth.'),
  gender: z.enum(['male', 'female'], { error: 'Please select your gender.' }),
  category: z.string().min(1, 'Please select a job category.'),
  message: z.string().optional(),
  cv: z.instanceof(File, { error: 'Please upload your CV.' }),
  confirm: z.literal(true, { error: 'Please confirm the information is correct.' }),
})

function Block({ title, children }) {
  return (
    <div className="border-t border-line pt-8">
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      {children}
    </div>
  )
}

function DemoForm() {
  const [submitted, setSubmitted] = useState(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(demoSchema),
    defaultValues: { fullName: '', mobile: '', dob: '', category: '', message: '', cv: null, confirm: false },
  })
  const dob = useWatch({ control, name: 'dob' })
  const age = ageFromDob(dob)

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitted({ ...values, cv: values.cv?.name })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      <FormField label="Full Name" required error={errors.fullName?.message}>
        <TextInput
          icon={User}
          placeholder="Enter your full name"
          autoComplete="name"
          {...register('fullName')}
        />
      </FormField>
      <FormField label="Mobile Number" required error={errors.mobile?.message}>
        <PhoneInput {...register('mobile')} />
      </FormField>
      <div className="grid grid-cols-[1fr_7rem] gap-4">
        <FormField label="Date of Birth" required error={errors.dob?.message}>
          <DateInput {...register('dob')} />
        </FormField>
        <FormField label="Age">
          <TextInput readOnly value={age ?? ''} placeholder="(Auto)" tabIndex={-1} />
        </FormField>
      </div>
      <FormField label="Gender" required group error={errors.gender?.message}>
        <RadioGroup
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          {...register('gender')}
        />
      </FormField>
      <FormField label="Preferred Job Category" required error={errors.category?.message}>
        <Select placeholder="Select job category" options={CATEGORIES} {...register('category')} />
      </FormField>
      <FormField label="Message" hint="Optional">
        <Textarea
          icon={MessageSquareText}
          rows={3}
          placeholder="Write your message here..."
          {...register('message')}
        />
      </FormField>
      <Controller
        control={control}
        name="cv"
        render={({ field, fieldState }) => (
          <FileDrop
            label="Upload CV / Resume"
            icon={IdCard}
            required
            error={fieldState.error?.message}
            invalid={Boolean(fieldState.error)}
            className="sm:col-span-2"
            {...field}
          />
        )}
      />
      <div className="sm:col-span-2">
        <Checkbox invalid={Boolean(errors.confirm)} {...register('confirm')}>
          I confirm that the information provided is true and correct.
        </Checkbox>
        {errors.confirm && (
          <p role="alert" className="mt-1.5 text-sm font-medium text-danger-600">
            {errors.confirm.message}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" iconLeft={Send} loading={isSubmitting} fullWidth>
          Submit Application
        </Button>
      </div>
      {submitted && (
        <Alert variant="success" title="Form is valid" className="sm:col-span-2">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(submitted, null, 2)}</pre>
        </Alert>
      )}
    </form>
  )
}

// Dev-only catalogue of every UI kit component (route /dev/ui, not included in production builds).
export default function DevUiPage() {
  const [tileFile, setTileFile] = useState(null)

  return (
    <>
      <Seo title="UI Kit" noIndex />
      <Section bg="surface" spacing="sm">
        <SectionHeading eyebrow="Developer preview" title="Rifa UI Kit" highlight="UI Kit" as="h1" />
      </Section>

      <Container className="space-y-10 py-10">
        <Block title="Logo">
          <div className="flex flex-wrap items-center gap-6">
            <Logo />
            <div className="rounded-card bg-navy-900 p-4">
              <Logo variant="white" />
            </div>
          </div>
        </Block>

        <Block title="Button">
          <div className="space-y-4">
            {['primary', 'outline', 'white', 'ghost'].map((variant) => (
              <div
                key={variant}
                className={
                  variant === 'white'
                    ? 'flex flex-wrap items-center gap-3 rounded-card bg-navy-900 p-4'
                    : 'flex flex-wrap items-center gap-3'
                }
              >
                <Button variant={variant} size="sm" iconRight>
                  Small
                </Button>
                <Button variant={variant} iconRight>
                  Find Job Opportunities
                </Button>
                <Button variant={variant} size="lg" iconLeft={Send}>
                  Large
                </Button>
                <Button variant={variant} shape="pill" iconRight>
                  View All Jobs
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/contact" variant="outline">
                Router link
              </Button>
              <Button href={site.phoneHref} iconLeft={Phone}>
                Anchor link
              </Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Block>

        <Block title="SectionHeading">
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Job opportunities in Malaysia"
              title="Explore Job Opportunities"
              highlight="Job Opportunities"
            />
            <SectionHeading title="Company Overview" size="md" underline />
            <SectionHeading
              title="Our Recruitment Process"
              highlight="Recruitment Process"
              subtitle="A simple, transparent and step-by-step process to help you start your journey to Malaysia."
              align="center"
              className="lg:col-span-2"
            />
          </div>
        </Block>

        <Block title="Section backgrounds">
          <div className="grid gap-3 sm:grid-cols-3">
            {['white', 'surface', 'navy'].map((bg) => (
              <Section
                key={bg}
                bg={bg}
                spacing="sm"
                className="rounded-card border border-line"
                containerClassName="px-4"
              >
                bg=&quot;{bg}&quot;
              </Section>
            ))}
          </div>
        </Block>

        <Block title="IconCircle">
          {['soft', 'solid'].map((variant) => (
            <div key={variant} className="mb-4 flex flex-wrap items-center gap-3 rounded-card bg-surface p-4">
              {TONES.map((tone) => (
                <IconCircle key={tone} icon={ShieldCheck} tone={tone} variant={variant} />
              ))}
              {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                <IconCircle key={size} icon={Users} size={size} variant={variant} />
              ))}
            </div>
          ))}
        </Block>

        <Block title="Badge">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="solid">120+ Jobs</Badge>
            <Badge tone="success" icon={Banknote}>
              {formatRm(1800, 2200)}
            </Badge>
            {['blue', 'success', 'warning', 'danger', 'neutral'].map((tone) => (
              <Badge key={tone} tone={tone} size="sm">
                {tone}
              </Badge>
            ))}
          </div>
        </Block>

        <Block title="Card">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['white', 'surface', 'blue', 'green', 'purple', 'orange', 'teal', 'red'].map((tint) => (
              <Card key={tint} tint={tint} interactive={tint === 'white'}>
                <IconCircle
                  icon={FileBadge}
                  tone={tint === 'white' || tint === 'surface' ? 'blue' : tint}
                  variant="solid"
                  size="sm"
                />
                <p className="mt-3 font-semibold text-ink">tint=&quot;{tint}&quot;</p>
                <p className="text-sm">Card content</p>
              </Card>
            ))}
          </div>
        </Block>

        <Block title="CheckList">
          <div className="grid gap-6 md:grid-cols-2">
            <CheckList
              items={[
                'Attractive Salary',
                'Overtime Opportunities',
                'Free Accommodation (in many jobs)',
                'Career Growth',
              ]}
              size="lg"
            />
            <CheckList
              items={['Integrity', 'Transparency', 'People First', 'Professionalism']}
              size="sm"
              columns={2}
            />
          </div>
        </Block>

        <Block title="Alert">
          <div className="grid gap-4 md:grid-cols-2">
            <Alert variant="info" title="Information">
              Our team will contact you soon.
            </Alert>
            <Alert variant="success" title="Application submitted">
              We have received your application.
            </Alert>
            <Alert variant="warning" title="Important Information">
              Rifa International (RL-693) does not charge any fee for online application.
            </Alert>
            <Alert variant="error" title="Something went wrong">
              Please try again in a few minutes.
            </Alert>
          </div>
        </Block>

        <Block title="Spinner">
          <div className="flex items-center gap-6 text-primary-600">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </div>
        </Block>

        <Block title="CloudinaryImage">
          <div className="grid gap-4 sm:grid-cols-3">
            <CloudinaryImage
              publicId=""
              alt="Placeholder while no image is uploaded"
              className="aspect-video rounded-card"
            />
            <CloudinaryImage
              publicId="/favicon.svg"
              alt="Local file path"
              className="aspect-video w-full rounded-card bg-surface object-contain p-6"
            />
            <CloudinaryImage
              publicId="rifa/hero/home"
              alt="Cloudinary ID (placeholder until cloud name is set)"
              className="aspect-video rounded-card"
            />
          </div>
        </Block>

        <Block title="PageHero">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-card border border-line">
              <PageHero
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
                title={[['About ', { text: 'Us', highlight: true }]]}
                subtitle="Connecting People to Global Opportunities"
                text="Rifa International (RL-693) is a government approved recruiting agency dedicated to creating better opportunities for Bangladeshi workers in Malaysia and other countries through ethical, transparent and reliable recruitment services."
                imageKey="hero.about"
                titleSize="xl"
              />
            </div>
            <div className="overflow-hidden rounded-card border border-line">
              <PageHero
                size="lg"
                titleSize="md"
                showFlag
                eyebrow="Malaysia Jobs"
                title={[
                  ['Work in ', { text: 'Malaysia', highlight: true }],
                  ['Build a ', { text: 'Brighter Future', highlight: true }],
                ]}
                text="Rifa International (RL-693) offers genuine job opportunities in Malaysia for skilled, semi-skilled and unskilled workers through trusted employers and legal process."
                imageKey="hero.malaysia-jobs"
                script={'Same\nPeople\nBigger\nOpportunities'}
              >
                <TrustStrip variant="inline" items={JOBS_TRUST} />
              </PageHero>
            </div>
            <div className="overflow-hidden rounded-card border border-line">
              <PageHero
                size="sm"
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Apply Now' }]}
                title={[['Apply ', { text: 'Now', highlight: true }]]}
                subtitle="Take the First Step Towards a Better Future"
                imageKey="hero.apply"
                script={'Your\nGlobal Career\nStarts Here'}
              />
            </div>
          </div>
        </Block>

        <Block title="TrustStrip">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-card bg-surface pt-7">
              <TrustStrip items={HOME_TRUST} />
            </div>
            <TrustStrip variant="inline" items={JOBS_TRUST} />
          </div>
        </Block>

        <Block title="CategoryCard">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-[70%] lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  shape="tall"
                  count={`${category.jobsCount}`}
                />
              ))}
            </div>
          </div>
        </Block>

        <Block title="JobCard">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </Block>

        <Block title="ProcessSteps">
          <div className="space-y-8">
            <ProcessSteps steps={steps6} numbered size="lg" />
            <ProcessSteps steps={steps5} />
            <ProcessSteps steps={steps6.map(({ icon, title }) => ({ icon, title }))} />
          </div>
        </Block>

        <Block title="FeatureCard">
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} shape="square" />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  layout="column"
                  tint={['surface', 'green', 'orange'][index]}
                  tone={['blue', 'green', 'orange'][index]}
                  text="Short supporting text for the feature goes here."
                />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} iconSize="sm" bordered={false} />
              ))}
            </div>
          </div>
        </Block>

        <Block title="CtaBanner">
          <div className="space-y-5">
            <CtaBanner
              variant="primary"
              icon={Users}
              title="Ready to Start Your Journey?"
              text="Apply now and take the first step towards a better future in Malaysia."
              button={{ label: 'Apply Now', to: '/apply' }}
            />
            <CtaBanner
              variant="navy"
              icon={Users}
              title="Ready to Start Your Career in Malaysia?"
              text="Apply now and let Rifa International (RL-693) connect you with trusted employers."
            />
            <CtaBanner
              variant="navy"
              title="Ready to Start Your Career in Malaysia?"
              text="Apply now and let Rifa International (RL-693) connect you with trusted employers."
              button={{ label: 'Apply Now', to: '/apply' }}
            />
          </div>
        </Block>

        <Block title="HelpBox">
          <div className="grid gap-5 lg:grid-cols-2">
            <HelpBox imageKey="help.agent" />
            <HelpBox tint="green" hours text="Contact our recruitment team" />
          </div>
        </Block>

        <Block title="Form controls (individual states)">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Email Address" hint="We never share your email.">
              <TextInput icon={Mail} type="email" placeholder="Enter your email address" />
            </FormField>
            <FormField label="Father's Name" required error="Please enter your father's name.">
              <TextInput placeholder="Enter your father's name" />
            </FormField>
            <FormField label="Disabled">
              <TextInput disabled placeholder="Not editable" />
            </FormField>
            <FormField label="Subject" required>
              <Select
                icon={FileText}
                placeholder="Select a subject"
                defaultValue=""
                options={['General Inquiry', 'Job Application']}
              />
            </FormField>
            <FormField label="Passport Status" required group>
              <RadioGroup
                name="passport-demo"
                options={['Have Passport', 'Will Apply Soon']}
                defaultValue="Have Passport"
              />
            </FormField>
            <FormField label="Work Experience">
              <Select
                icon={BriefcaseBusiness}
                placeholder="Select experience (if any)"
                defaultValue=""
                options={['No experience', '1-2 years', '3+ years']}
              />
            </FormField>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FileDrop
              variant="tile"
              label="Passport Copy"
              icon={Globe}
              required
              value={tileFile}
              onChange={setTileFile}
              id="tile-demo"
            />
            <FileDrop variant="tile" label="NID Copy" icon={IdCard} required />
            <FileDrop variant="tile" label="Recent Photo" icon={User} error="Please upload a recent photo." />
            <FileDrop variant="tile" label="Educational Certificate" icon={Headset} />
          </div>
        </Block>

        <Block title="Form with react-hook-form + zod (refs, validation, Controller)">
          <Card padding="lg">
            <DemoForm />
          </Card>
        </Block>

        <Block title="lib helpers">
          <ul className="space-y-1 font-mono text-sm">
            <li>formatRm(1800, 2200) → {formatRm(1800, 2200)}</li>
            <li>formatDateTime(now) → {formatDateTime(new Date())}</li>
            <li>formatFileSize(1572864) → {formatFileSize(1572864)}</li>
            <li>ageFromDob(&apos;2000-01-15&apos;) → {ageFromDob('2000-01-15')}</li>
          </ul>
        </Block>
      </Container>
    </>
  )
}
