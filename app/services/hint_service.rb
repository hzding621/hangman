require 'singleton'

# This service implements a brute-force policy for finding a hint for a hangman game
# It is instantiated once as a singleton class and called from GamesController
class HintService

  include Singleton

  def initialize
    @words = []
    File.open(Rails.application.config.dictionary_file_path).each_line do |line|
      @words << line.chomp
    end
    puts "Dictionary successfully loaded #{@words.length} words in memory"
  end

  # a pattern denotes the known and unknown letter in a word, e.g. 're__s__ion'
  # This method returns all words in dictionary that matches the pattern
  # It should handle these cases
  # (1) length should be equal
  # (2) non-underscored letters should match exactly
  # (3) underscored letters should not be in the trials
  def find_matched_words(pattern, trials)
    matched_word = []
    @words.each do |w|
      if w.length != pattern.length
        next
      end
      match = true
      pattern.each_char.with_index do |c, i|
        if c != '_' and c != w[i]
          match = false
          break
        end

        if c == '_' and trials.include? w[i]
          match = false
          break
        end
      end
      matched_word << w if match
    end
    matched_word
  end

  # This method builds a map from letters to frequencies from the given list of words
  def build_frequency_tables(words)
    frequencies = {}
    words.each do |w|
      w.each_char do |c|
        frequencies[c] = (frequencies[c] || 0) + 1
      end
    end
    frequencies
  end

  # This method finds the most frequent letters not appearing in filtered_letters
  def max_frequency_letter(frequency_table, filtered_letters)
    max_letter = ''
    max_frequency = 0
    frequency_table.each do |letter, frequency|
      if filtered_letters.include? letter
        next
      end
      if frequency > max_frequency
        max_letter = letter
        max_frequency = frequency
      end
    end
    max_letter
  end

  # The stub method that executes the frequency-based search policy
  def find_hint(pattern, trials)
    matched_word = find_matched_words pattern, trials
    frequencies = build_frequency_tables matched_word
    max_frequency_letter frequencies, trials
  end
end