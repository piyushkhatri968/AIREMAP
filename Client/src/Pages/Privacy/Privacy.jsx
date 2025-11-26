import porscheImage from "../../assets/AuthImages/car1.png";

const Privacy = () => {
    return (
        <div className="min-h-screen relative font-sans antialiased">
            {/* Background Image */}
            <div className="fixed inset-0">
                <img
                    src={porscheImage}
                    alt="Red Porsche Sports Car"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-10">

                {/* Privacy Policy Content */}
                <div className="w-full max-w-4xl bg-zinc-50/90 dark:bg-[#171819] backdrop-blur p-8 md:p-12 rounded-lg shadow-2xl">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Airemap GDPR Privacy Policy</h1>

                    <div className="space-y-6 text-zinc-700 dark:text-gray-200">
                        <p>
                            Airemap is strongly committed to protecting your privacy and complying with your choices.
                        </p>

                        <p>
                            Our company data protection policy refers to our commitment to treat information of customers, site users and other interested parties with the utmost care and confidentiality.
                        </p>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Policy elements</h2>
                            <p>
                                As part of our operations, we need to obtain and process information. This information may include data that makes a person identifiable such as names, addresses, usernames and Digital footprints
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Our commitment once this information is available to us</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your information will not be shared, rented or sold to any third party.</li>
                                <li>We use state of the art security measures to protect your information from unauthorized users.</li>
                                <li>We give you the possibility to control the information that you shared with us (opt-out)</li>
                                <li>Your information shall be accurate and up to date.</li>
                                <li>Collected fairly and lawfully, with consumers consent.</li>
                            </ul>
                            <p className="mt-2">
                                Airemap is committed to processing data in accordance with its responsibilities under the GDPR.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Airemap use of personal information</h2>
                            <p>
                                When using our site, you may be asked to provide personally identifiable information such as Name, Address, Email address. Airemap web site is owned and fully operated by Airemap.
                            </p>
                            <p className="mt-2">
                                Supplying personally identifiable is done at the consumers own discretion; however, some services may not be accessible if the consumer does not wish to supply certain details.
                            </p>
                            <p className="mt-2">
                                When registering with Airemap, the information collected may include as above, and other information pertinent to deal with your enquiry or order.
                            </p>
                            <p className="mt-2">
                                If you submit personally identifiable information to us through the site, we use this information to operate, maintain and provide appropriate features tailored to that customer's needs.
                            </p>
                            <p className="mt-2">
                                We may use cookies and log and file information to make any future visits to the site as smooth and effective as possible.
                            </p>
                            <p className="mt-2">
                                However, we do not represent, warrant, or guarantee that your personal information will be protected against unauthorised access, loss, misuse, or alterations, and do not accept any liability for the security of the personal information submitted to us nor for your or third parties' use or misuse of personal information. You are always solely responsible for maintaining the secrecy of your unique Password and account information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Disclosure of personal information to third parties</h2>
                            <p>
                                With consumer permission, we may share some details with Airemap authorized dealer/s or affiliates, so they may aid in assisting with your enquiry. As independent dealers they then have the responsibility to maintain correct security of consumers personal information, as required by law.
                            </p>
                            <p className="mt-2">
                                No personal information shall be disclosed without your prior consent except in the instance of legal claims or violation of our policies.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">In the event of Merger or Sale of Airemap</h2>
                            <p>
                                In the event of Airemap merging with another company or sale; we reserve the right to transfer or assign the information we hold from our users as part of said merger or sale.
                            </p>
                            <p className="mt-2">
                                In such events Airemap may not be able to control how your personal information is treated or used.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Access to changes in preference or withdrawal of personal information</h2>
                            <p>
                                At any time, you have the right to request to view, alter or remove the information held by us.
                            </p>
                            <p className="mt-2">
                                In such instances please submit your request by emailing{" "}
                                <a href="mailto:files@airemap.co.uk" className="text-red-500 hover:text-red-400">files@airemap.co.uk</a>.
                            </p>
                            <p className="mt-2">
                                All enquiries will be swiftly dealt with and a response to your request shall be sent to confirm and acknowledge completion.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Airemap Company Details</h2>
                            <p>
                                If you have queries regarding our GDPR policy or anything else, please contact us via email{" "}
                                <a href="mailto:files@airemap.co.uk" className="text-red-500 hover:text-red-400">files@airemap.co.uk</a>, or alternatively contact us at our company address.
                            </p>
                            <div className="mt-4 text-zinc-500 dark:text-gray-300">
                                <p>Airemap,</p>
                                <p>Unit 16, Hamptom Lovett Ind Est, Droitwich</p>
                                <p>Worcestershire,</p>
                                <p>WR90NX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
