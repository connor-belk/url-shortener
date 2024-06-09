const PrivacyPolicyPage = () => {
  return (
    <div className="text-lg mx-4 my-2">
      <h2 className="text-4xl text-center font-bold">Privacy Policy</h2>
      <p className="text-center">Last updated: June 9, 2024</p>
      <br />
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">Introduction</h3>
        <p className="">
          <span className="ml-5">Welcome</span> to our URL-Shortening App. Your
          privacy is important to us. This privacy policy explains what personal
          data we collect from you, how we use it, and your rights regarding
          this information.
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">
          Information We Collect
        </h3>
        <p className="">
          During account creation, we collect the following personal
          information:
          <ul className="list-disc ml-10">
            <li>Email Address</li>
            <li>Name</li>
            <li>Google Profile Image</li>
          </ul>
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">
          How We Use Your Information
        </h3>
        <p className="">
          The information collected is used solely for the following purposes:
          <ul className="list-disc ml-10">
            <li>
              <span className="font-bold">User Account Creation:</span> To set
              up and manage your account.
            </li>
            <li>
              <span className="font-bold">
                Custom Link Creation and Management:
              </span>{" "}
              To enable you to create and manage custom shortened URLs.
            </li>
          </ul>
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">
          Data Sharing and Disclosure
        </h3>
        <p className="">
          We do not share, sell, rent, or trade your personal information with
          third parties. Your data is used exclusively within our app for the
          purposes mentioned above.
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">Data Security</h3>
        <p className="">
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction.
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">Your Rights</h3>
        <p className="">
          You have the right to access, update, or delete your personal
          information. If you wish to exercise any of these rights, please
          contact us at email@domain.com.
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">
          Changes to This Privacy Policy
        </h3>
        <p className="">
          We may update this privacy policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </section>
      <section className="my-5">
        <h3 className="text-2xl text-center font-bold">Contact Us</h3>
        <p className="">
          If you have any questions or concerns about this privacy policy,
          please contact us at email@domain.com.
        </p>
      </section>
      <p>Effective Date: June 9, 2024</p>
    </div>
  );
};

export default PrivacyPolicyPage;
