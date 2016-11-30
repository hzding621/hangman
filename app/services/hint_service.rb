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
  def find_matched_word_with_pattern(pattern)
    matched_word = []
    @words.each do |w|
      if w.length != pattern.length
        next
      end
      match = true
      pattern.each_char.with_index do |c, i|
        if c != '_' and c != w[i]
          match = false
        end
      end
      matched_word << w if match
    end
    matched_word
  end

  # This method removes words if it contains any of the wrong letters
  def filter_words_of_wrong_letters!(words, wrong_letters)
    words.delete_if do |w|
      wrong_letters.each_char.any? do |c|
        w.include? c
      end
    end
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
    matched_word = find_matched_word_with_pattern pattern
    wrong_letters = trials.split('').delete_if do |c|
      pattern.include? c
    end.join('') # wrong letters are those that previously tried but not matched
    matched_word = filter_words_of_wrong_letters! matched_word, wrong_letters
    max_frequency_letter (build_frequency_tables matched_word), trials
  end
end