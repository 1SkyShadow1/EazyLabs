import { supabase } from "../lib/supabaseClient";

export const AIPredictor = () => {
  // ... existing state ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // First, save the submission to the database
      const { error: dbError } = await supabase
        .from('ai_predictor_submissions')
        .insert([{ summary: appSummary }]);

      if (dbError) throw dbError;

      // Then proceed with the AI prediction
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appSummary }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component code ...
} 