import React, { useState } from 'react';
import {
  FileText,
  Share2,
  Mail,
  Download,
  Copy,
  Check,
  Loader,
  RotateCcw,
  Home,
  DollarSign,
  Ruler,
  Bed,
  MapPin,
  Zap,
} from 'lucide-react';

export default function EstateflyerAI() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('urgent'); // urgent, modern, luxury
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [activeTab, setActiveTab] = useState('flyer');
  const [copied, setCopied] = useState(null);

  // Mock property data parser
  const parsePropertyData = (text) => {
    // Simple regex-based extraction
    const priceMatch = text.match(/\d+\s*(?:€|EUR|eur)?/);
    const areaMatch = text.match(/(\d+)\s*(?:m²|m2|m\²)/i);
    const roomsMatch = text.match(/(\d+)\s*(?:izbam?|rooms?|izby)/i);

    return {
      price: priceMatch ? priceMatch[0] : '250 000 €',
      area: areaMatch ? areaMatch[1] + ' m²' : '120 m²',
      rooms: roomsMatch ? roomsMatch[1] : '3',
      location: 'Bratislava, Staré Mesto',
      condition: 'Čerstvo zrekonštruovaná',
    };
  };

  // Generate marketing content
  const generateContent = async () => {
    if (!input.trim()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const propertyData = parsePropertyData(input);

      const toneSettings = {
        urgent: { headline: 'BEZODKLADNE VOLAJTE!', style: 'dynamický a naliehavý' },
        modern: { headline: 'Váš dom čaká!', style: 'moderný a priateľský' },
        luxury: { headline: 'Luxusný životný štýl', style: 'elegantný a exkluzívny' },
      };

      const toneConfig = toneSettings[tone];

      const flyerContent = {
        title: `${toneConfig.headline} - Nehnuteľnosť v ideálnej lokalite`,
        description: `${input.substring(0, 200)}...`,
        benefits: [
          'Skvelá lokalita v centre mesta',
          'Moderný dizajn interiéru',
          'Bezpečné parkovanie v dvore',
          'Blízkosť všetkých služieb',
          'Výšková dispozícia bytovky',
        ],
      };

      const socialContent = `🏠 ${toneConfig.headline}\n\n${input.substring(0, 150)}...\n\n✨ Kľúčové výhody:\n• Perfektná lokalita\n• Moderný interiér\n• Parkovanie v dvore\n\n📞 Voláte nás teraz!\n📧 info@realitakancelaria.sk\n\n#nehnutelnosti #reality #byvanie #bratislava #dom #apartman #nehnutelosť #realestate`;

      const emailContent = {
        subject: `Exkluzívna nehnuteľnosť - ${propertyData.price}`,
        body: `Vážený záujemca,\n\nprezentujeme vám výnimočnú nehnuteľnosť v ideálnej lokalite.\n\n${flyerContent.description}\n\nKľúčové informácie:\n• Cena: ${propertyData.price}\n• Výmera: ${propertyData.area}\n• Počet izieb: ${propertyData.rooms}\n• Lokalita: ${propertyData.location}\n• Stav: ${propertyData.condition}\n\nMáme vás pozvať na prehliadku. Tešíme sa na vás!\n\nS pozdravom,\nVáša realitná kancelária\ninfo@realitakancelaria.sk\n+421 2 1234 5678`,
      };

      setGenerated({
        propertyData,
        flyerContent,
        socialContent,
        emailContent,
      });

      setActiveTab('flyer');
      setLoading(false);
    }, 1500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setInput('');
    setGenerated(null);
    setTone('urgent');
    setActiveTab('flyer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-dark-800 bg-dark-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EstateFlyer AI</h1>
                <p className="text-xs text-dark-400">Profesionálny marketing pre realitárov</p>
              </div>
            </div>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-lg bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary transition-colors"
            >
              Cenník
            </a>
          </div>
        </div>
      </header>

      {!generated ? (
        <>
          {/* Hero Section */}
          <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 -top-40 opacity-30">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-primary rounded-full mix-blend-screen blur-3xl opacity-20" />
              <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent-secondary rounded-full mix-blend-screen blur-3xl opacity-20" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Vytvorte profesionálny ponukový list a sociálne príspevky{' '}
                  <span className="gradient-text">do 10 sekúnd</span>
                </h2>
                <p className="text-lg text-dark-300">
                  Transformujte surový text inzerátu na pútavý marketingový balík pre vašich klientov.
                </p>
              </div>

              {/* Input Form */}
              <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 card-shadow mb-6">
                <label className="block text-sm font-semibold mb-3">Vložte text inzerátu</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Vložte sem text inzerátu nehnuteľnosti... (napr. 3-izbový byt v centre Bratislavy, 120 m², cena 250 000 €, čerstvo zrekonštruovaný...)"
                  className="w-full h-32 bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-dark-50 placeholder-dark-500 focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30 resize-none"
                />
              </div>

              {/* Tone Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Vyber si tón reči</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'urgent', label: 'Naliehavý / Exkluzívny', icon: '⚡' },
                    { id: 'modern', label: 'Moderný / Priateľský', icon: '✨' },
                    { id: 'luxury', label: 'Elegancia / Luxus', icon: '👑' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        tone === t.id
                          ? 'border-accent-primary bg-accent-primary/10'
                          : 'border-dark-700 bg-dark-700/50 hover:border-dark-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">{t.icon}</div>
                      <div className="text-sm font-medium">{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateContent}
                disabled={loading || !input.trim()}
                className="w-full py-3 px-6 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-accent-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-hover flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generujem váš marketingový balík...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Vygenerovať marketingový balík
                  </>
                )}
              </button>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Results Section */}
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Nová nehnuteľnosť
              </button>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6 border-b border-dark-800 overflow-x-auto">
                {[
                  { id: 'flyer', label: 'Ponukový list', icon: FileText },
                  { id: 'social', label: 'Sociálne siete', icon: Share2 },
                  { id: 'email', label: 'E-mail', icon: Mail },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-accent-primary text-accent-primary'
                          : 'border-transparent text-dark-400 hover:text-dark-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              {activeTab === 'flyer' && (
                <div className="space-y-6">
                  {/* PDF Preview Card */}
                  <div className="bg-white text-dark-900 rounded-xl overflow-hidden card-shadow max-w-2xl mx-auto">
                    <div className="aspect-[8.5/11] bg-white p-8 space-y-6">
                      {/* Header */}
                      <div className="border-b-2 border-dark-200 pb-4">
                        <h3 className="text-3xl font-bold gradient-text mb-2">
                          {generated.flyerContent.title.split(' - ')[0]}
                        </h3>
                        <p className="text-dark-600 text-sm">
                          {generated.propertyData.location}
                        </p>
                      </div>

                      {/* Property Details Table */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent-primary" />
                          <div>
                            <p className="text-xs text-dark-600">Cena</p>
                            <p className="font-bold">{generated.propertyData.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-accent-primary" />
                          <div>
                            <p className="text-xs text-dark-600">Výmera</p>
                            <p className="font-bold">{generated.propertyData.area}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-accent-primary" />
                          <div>
                            <p className="text-xs text-dark-600">Izby</p>
                            <p className="font-bold">{generated.propertyData.rooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent-primary" />
                          <div>
                            <p className="text-xs text-dark-600">Stav</p>
                            <p className="font-bold text-sm">{generated.propertyData.condition}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="text-sm text-dark-700 space-y-2">
                        <p>{generated.flyerContent.description}</p>
                        <p>Toto je vzorový text, ktorý bol vygenerovaný z vášho inzerátu.</p>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-bold mb-3 text-dark-900">TOP 5 výhod</h4>
                        <ul className="space-y-2 text-sm">
                          {generated.flyerContent.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-accent-primary font-bold mt-1">✓</span>
                              <span className="text-dark-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact */}
                      <div className="border-t-2 border-dark-200 pt-4 text-xs">
                        <p className="font-bold text-dark-900">Kontakt na makléra</p>
                        <p className="text-dark-600">Meno: Ján Oravec</p>
                        <p className="text-dark-600">Telefón: +421 2 1234 5678</p>
                        <p className="text-dark-600">E-mail: jan.oravec@realitakancelaria.sk</p>
                        <p className="text-dark-600">Kancelária: Reality Bratislava s.r.o.</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-6 py-3 bg-accent-primary rounded-lg hover:bg-accent-primary/90 font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Stiahnuť PDF / Vytlačiť
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 card-shadow max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-2">
                        Instagram / Facebook príspevok
                      </label>
                      <div className="bg-dark-700 rounded-lg p-4 text-dark-200 whitespace-pre-wrap break-words text-sm h-64 overflow-y-auto">
                        {generated.socialContent}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(generated.socialContent, 'social')
                      }
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                        copied === 'social'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30'
                      }`}
                    >
                      {copied === 'social' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Skopírované!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopírovať text
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 card-shadow max-w-2xl mx-auto space-y-4">
                  <div>
                    <label className="text-sm font-semibold block mb-2">Predmet e-mailu</label>
                    <div className="bg-dark-700 rounded-lg p-3 text-dark-200 text-sm">
                      {generated.emailContent.subject}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold block mb-2">Telo e-mailu</label>
                    <div className="bg-dark-700 rounded-lg p-4 text-dark-200 whitespace-pre-wrap break-words text-sm h-64 overflow-y-auto">
                      {generated.emailContent.body}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const fullEmail = `Predmet: ${generated.emailContent.subject}\n\n${generated.emailContent.body}`;
                      handleCopy(fullEmail, 'email');
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                      copied === 'email'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30'
                    }`}
                  >
                    {copied === 'email' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Skopírované!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Kopírovať e-mail
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-dark-800 bg-dark-900 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-5 h-5 text-accent-primary" />
                <span className="font-bold">EstateFlyer AI</span>
              </div>
              <p className="text-dark-400 text-sm">
                Profesionálny marketing pre realitárov
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produkty</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-accent-primary transition">Ponukový list</a></li>
                <li><a href="#" className="hover:text-accent-primary transition">Sociálne siete</a></li>
                <li><a href="#" className="hover:text-accent-primary transition">E-mailové kampane</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Spoločnosť</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-accent-primary transition">O nás</a></li>
                <li><a href="#" className="hover:text-accent-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-accent-primary transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Právne</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-accent-primary transition">Podmienky</a></li>
                <li><a href="#" className="hover:text-accent-primary transition">Ochrana dát</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-800 pt-6 text-center text-dark-400 text-sm">
            <p>&copy; 2024 EstateFlyer AI. Všetky práva vyhradené.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
